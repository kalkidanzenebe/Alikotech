import { UserRole } from "@/types";

// ─── Permission definitions ─────────────────────────────────

type Permission =
  | "project:create"
  | "project:read"
  | "project:update"
  | "project:delete"
  | "task:create"
  | "task:read"
  | "task:update"
  | "contract:create"
  | "contract:read"
  | "contract:approve"
  | "contract:reject"
  | "inspection:create"
  | "inspection:read"
  | "inspection:update";

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    "project:create", "project:read", "project:update", "project:delete",
    "task:create", "task:read", "task:update",
    "contract:create", "contract:read", "contract:approve", "contract:reject",
    "inspection:create", "inspection:read", "inspection:update",
  ],
  [UserRole.CONTRACTOR]: [
    "project:read", "project:update",
    "task:read", "task:update",
    "contract:read",
    "inspection:read", "inspection:update",
  ],
  [UserRole.CLIENT]: [
    "project:read",
    "task:read",
    "contract:read",
    "inspection:read",
  ],
};

export function hasPermission(role: UserRole | null, permission: Permission): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function canSee(role: UserRole | null, isVisibleToClient: boolean): boolean {
  if (!role) return false;
  if (role === UserRole.CLIENT) return isVisibleToClient;
  return true;
}
