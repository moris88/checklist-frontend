export type Status =
  | "BACKLOG"
  | "OPEN"
  | "IN PROGRESS"
  | "DONE"
  | "DELETED"
  | "ARCHIVED"
  | "CLOSED"
  | "REOPENED"
  | "PENDING";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type Type =
  | "system integration"
  | "widget"
  | "webservice"
  | "serverless"
  | "cf-deluge"
  | "configuration"
  | "others";
export type Service = "Zoho" | "Freshworks" | "Hubspot" | "Zendesk" | "others";
export type SubService =
  | "Zoho CRM"
  | "Zoho Creator"
  | "Zoho Desk"
  | "Zoho Analitycs"
  | "Freshdesk"
  | "Freshservice"
  | "FreshCaller"
  | "Zendesk Support"
  | "Zendesk Sell"
  | "Zendesk Guide"
  | "others";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: Status | null;
  updatedAt: Date;
  log: string | null;
  priority: Priority | null;
  deadline: Date | null;
  projectID: number | null;
  assignee: User | null;
  type: Type | null;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  role:
    | "TECHNICAL LEADER"
    | "SENIOR PROJECT MANAGER"
    | "JUNIOR PROJECT MANAGER"
    | "JUNIOR SOLUTION"
    | "SENIOR SOLUTION"
    | "JUNIOR DEVELOPER"
    | "SENIOR DEVELOPER"
    | "JUNIOR STAGE DEVELOPER";
}

export interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  members: User[];
  service: Service | null;
  subService: SubService | null;
  status: "OPENED" | "ACTIVE" | "CLOSED";
}
