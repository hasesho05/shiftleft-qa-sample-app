import React from "react";

const routes = [
  { path: "/", component: "TaskBoard" },
  { path: "/approvals", component: "TaskApprovalPage" },
];

export function getRoutes() {
  return routes;
}
