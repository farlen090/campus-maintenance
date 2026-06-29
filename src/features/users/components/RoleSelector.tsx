import { userRoles } from "../../../shared/constants/roles";
import type { UserRole } from "../../../shared/types/user";

type RoleSelectorProps = {
  value: UserRole;
  onChange: (role: UserRole) => void;
};

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <label className="role-selector">
      <span>Role aktif</span>
      <select
        aria-label="Pilih role aktif"
        value={value}
        onChange={(event) => onChange(event.target.value as UserRole)}
      >
        {userRoles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label}
          </option>
        ))}
      </select>
    </label>
  );
}
