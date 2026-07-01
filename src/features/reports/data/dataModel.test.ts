import { describe, expect, it } from "vitest";
import {
  requestCategories,
  requestPriorities,
  requestStatusKeys,
  requestStatuses
} from "../constants";
import { serviceRequests } from "./serviceRequests";
import { requestComments } from "./requestComments";
import { statusHistories } from "./statusHistories";
import { userRoles } from "../../../shared/constants/roles";
import { users } from "../../../shared/data/users";

describe("Data model and dummy data", () => {
  it("TC-004 keeps dummy users on known roles", () => {
    const validRoles = new Set(userRoles.map((role) => role.value));

    expect(users.length).toBeGreaterThanOrEqual(5);
    expect(users.every((user) => validRoles.has(user.role))).toBe(true);
  });

  it("TC-005 keeps dummy requests on valid domain values", () => {
    const validStatuses = new Set(requestStatuses);
    const validCategories = new Set(requestCategories);
    const validPriorities = new Set(requestPriorities);
    const validRequestIds = new Set(serviceRequests.map((request) => request.id));
    const validUserIds = new Set(users.map((user) => user.id));

    expect(serviceRequests.length).toBeGreaterThanOrEqual(4);
    expect(
      serviceRequests.every(
        (request) =>
          validStatuses.has(request.status) &&
          validCategories.has(request.category) &&
          validPriorities.has(request.priority) &&
          request.statusKey === requestStatusKeys[request.status]
      )
    ).toBe(true);
    expect(requestComments.length).toBeGreaterThan(0);
    expect(
      requestComments.every(
        (comment) =>
          validRequestIds.has(comment.requestId) && validUserIds.has(comment.authorId)
      )
    ).toBe(true);
    expect(statusHistories.length).toBeGreaterThan(0);
    expect(
      statusHistories.every(
        (history) =>
          validRequestIds.has(history.requestId) &&
          validUserIds.has(history.changedBy) &&
          validStatuses.has(history.toStatus) &&
          (history.fromStatus === null || validStatuses.has(history.fromStatus))
      )
    ).toBe(true);
  });

  it("TC-006 follows the expected status flow", () => {
    expect(requestStatuses).toEqual([
      "Submitted",
      "Under Review",
      "Assigned",
      "In Progress",
      "Resolved",
      "Closed"
    ]);
  });
});
