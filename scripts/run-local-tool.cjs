const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const [tool, ...args] = process.argv.slice(2);

if (!tool) {
  console.error("Usage: node scripts/run-local-tool.cjs <tool> [...args]");
  process.exit(1);
}

const projectRoot = process.cwd();

function runTool(root) {
  const executable = path.join(
    root,
    "node_modules",
    ".bin",
    process.platform === "win32" ? `${tool}.cmd` : tool
  );

  const command = process.platform === "win32" ? "cmd.exe" : executable;
  const commandArgs =
    process.platform === "win32" ? ["/d", "/s", "/c", executable, ...args] : args;

  execFileSync(command, commandArgs, {
    cwd: root,
    env: process.env,
    stdio: "inherit"
  });
}

function findAvailableDriveLetter() {
  for (let code = "Z".charCodeAt(0); code >= "P".charCodeAt(0); code -= 1) {
    const drive = String.fromCharCode(code);

    if (!fs.existsSync(`${drive}:\\`)) {
      return drive;
    }
  }

  throw new Error("No available drive letter found for local tool execution.");
}

if (process.platform !== "win32") {
  runTool(projectRoot);
  process.exit(0);
}

const drive = findAvailableDriveLetter();
const mountedRoot = `${drive}:\\`;

try {
  execFileSync("subst", [`${drive}:`, projectRoot], { stdio: "ignore" });
  runTool(mountedRoot);
} finally {
  execFileSync("subst", [`${drive}:`, "/D"], { stdio: "ignore" });
}
