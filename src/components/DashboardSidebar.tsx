import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FolderKanban, FileText, ClipboardCheck, ListTodo, Users, LayoutDashboard, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import alikoLogo from "@/assets/alikotech-logo.png";

const navGroups = [
  {
    label: "Overview",
    items: [
      { title: "Overview", url: "/dashboard", icon: LayoutDashboard, roles: [UserRole.ADMIN, UserRole.CONTRACTOR, UserRole.CLIENT], end: true as boolean | undefined },
    ],
  },
  {
    label: "Work",
    items: [
      { title: "Projects", url: "/dashboard/projects", icon: FolderKanban, roles: [UserRole.ADMIN, UserRole.CONTRACTOR, UserRole.CLIENT], end: undefined as boolean | undefined },
      { title: "Tasks", url: "/dashboard/tasks", icon: ListTodo, roles: [UserRole.ADMIN, UserRole.CONTRACTOR], end: undefined as boolean | undefined },
      { title: "Inspections", url: "/dashboard/inspections", icon: ClipboardCheck, roles: [UserRole.ADMIN, UserRole.CONTRACTOR], end: undefined as boolean | undefined },
    ],
  },
  {
    label: "Admin",
    items: [
      { title: "Contracts", url: "/dashboard/contracts", icon: FileText, roles: [UserRole.ADMIN, UserRole.CONTRACTOR, UserRole.CLIENT], end: undefined as boolean | undefined },
      { title: "Users", url: "/dashboard/users", icon: Users, roles: [UserRole.ADMIN], end: undefined as boolean | undefined },
    ],
  },
];

export function DashboardSidebar() {
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const visibleGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => user?.role && item.roles.includes(user.role)),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        <img
          src={alikoLogo}
          alt="AlikoTech"
          className={collapsed ? "h-7 w-7 object-contain" : "h-10 object-contain"}
        />
      </SidebarHeader>

      <SidebarContent>
        {visibleGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{!collapsed && group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = item.end
                    ? location.pathname === item.url
                    : location.pathname.startsWith(item.url) && item.url !== "/dashboard";
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                        <NavLink to={item.url} end={item.end}>
                          <item.icon className="h-4 w-4" aria-hidden="true" />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-3">
        {!collapsed && user && (
          <div className="mb-2 rounded-lg border border-border bg-secondary/50 px-3 py-2">
            <p className="truncate text-xs font-medium text-foreground">{user.name || user.email}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-accent">{user.role}</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="h-11 w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
        >
          <LogOut size={14} aria-hidden="true" />
          {!collapsed && "Sign Out"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
