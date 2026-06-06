"use client";

import { useState } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import Image from "next/image";
import {
  BookOpen,
  Bot,
  ChevronDown,
  Database,
  Menu,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
  Video,
  X,
} from "lucide-react";

export type View =
  | "dashboard"
  | "work-orders"
  | "work-order-detail"
  | "assets"
  | "asset-detail"
  | "inventory"
  | "inventory-detail"
  | "tasks"
  | "task-detail"
  | "purchase-requests"
  | "purchase-request-detail"
  | "stock-movement"
  | "stock-movement-detail"
  | "stock-movement-stats"
  | "vendors"
  | "vendor-detail"
  | "warehouses"
  | "warehouse-detail"
  | "inventory-categories"
  | "inventory-category-detail"
  | "users"
  | "user-detail"
  | "roles"
  | "facilities"
  | "facility-detail"
  | "enterprises"
  | "enterprise-detail"
  | "issues"
  | "issue-detail"
  | "work-requests"
  | "response-issues"
  | "your-tasks"
  | "backups"
  | "planner"
  | "video-call"
  | "profiles"
  | "settings";

const navGroups: {
  title: string;
  icon: React.ReactNode;
  items: { id: View; label: string; detailViews?: View[] }[];
}[] = [
  {
    title: "General",
    icon: <BookOpen className="h-4 w-4" />,
    items: [
      { id: "dashboard", label: "Dashboard" },
      { id: "issues", label: "Issues", detailViews: ["issue-detail"] },
      { id: "response-issues", label: "Response Issues" },
      { id: "planner", label: "Planner" },
    ],
  },
  {
    title: "Work Orders",
    icon: <Bot className="h-4 w-4" />,
    items: [
      { id: "work-requests", label: "Work Requests" },
      { id: "work-orders", label: "Work Orders", detailViews: ["work-order-detail"] },
      { id: "tasks", label: "Tasks", detailViews: ["task-detail"] },
      { id: "your-tasks", label: "Your Tasks" },
    ],
  },
  {
    title: "Assets",
    icon: <PieChart className="h-4 w-4" />,
    items: [
      { id: "assets", label: "Assets", detailViews: ["asset-detail"] },
      { id: "facilities", label: "Facilities", detailViews: ["facility-detail"] },
      { id: "enterprises", label: "Enterprises", detailViews: ["enterprise-detail"] },
    ],
  },
  {
    title: "Inventory",
    icon: <Database className="h-4 w-4" />,
    items: [
      { id: "inventory", label: "Inventory", detailViews: ["inventory-detail"] },
      { id: "inventory-categories", label: "Inventory Categories", detailViews: ["inventory-category-detail"] },
      { id: "vendors", label: "Vendors", detailViews: ["vendor-detail"] },
      { id: "warehouses", label: "Warehouses", detailViews: ["warehouse-detail"] },
      { id: "stock-movement", label: "Stock Movement", detailViews: ["stock-movement-detail"] },
      { id: "stock-movement-stats", label: "Stock Statistics" },
      { id: "purchase-requests", label: "Purchase Requests", detailViews: ["purchase-request-detail"] },
    ],
  },
  {
    title: "Users management",
    icon: <SquareTerminal className="h-4 w-4" />,
    items: [
      { id: "users", label: "Users", detailViews: ["user-detail"] },
      { id: "roles", label: "Roles" },
    ],
  },
  {
    title: "Video Call",
    icon: <Video className="h-4 w-4" />,
    items: [
      { id: "video-call", label: "Video Call" },
    ],
  },
  {
    title: "Other",
    icon: <Settings2 className="h-4 w-4" />,
    items: [
      { id: "settings", label: "Settings" },
      { id: "backups", label: "Backup & Restore" },
    ],
  },
];

export function Sidebar({ currentView, onNavigate }: { currentView: View; onNavigate: (v: View) => void }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNav = (id: View) => {
    onNavigate(id);
  };

  return (
    <aside
      className={`cmms-sidebar ${isCollapsed ? "cmms-sidebar-collapsed" : ""}`}
    >
      <div className="cmms-sidebar-header">
        <button className="cmms-logo-button" onClick={() => onNavigate("dashboard")} aria-label="Dashboard">
          <Image src="/RoboMainBack.png" alt="ERP-CMMS" width={92} height={92} priority className="cmms-logo-full" />
          <Image src="/LogoSimple.png" alt="ERP-CMMS" width={28} height={28} className="cmms-logo-compact" />
        </button>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="cmms-collapse-button"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </button>
      </div>

      <nav className="cmms-sidebar-content">
        <div className="cmms-platform-label">Platform</div>
        {navGroups.map((group) => (
          <div className="cmms-menu-block" key={group.title}>
            <Tooltip content={group.title} side="right">
              <button className="cmms-menu-parent" type="button">
                {group.icon}
                <span className="cmms-menu-parent-title">{group.title}</span>
                <ChevronDown className="cmms-menu-chevron" />
              </button>
            </Tooltip>

            <div className="cmms-submenu">
              {group.items.map((item) => {
                const isActive = currentView === item.id || Boolean(item.detailViews?.includes(currentView));
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`cmms-submenu-button ${isActive ? "cmms-submenu-active" : ""}`}
                    type="button"
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="cmms-sidebar-footer">
        <button className="cmms-user-button" onClick={() => onNavigate("profiles")} type="button">
          <div className="cmms-user-avatar">
            <User className="h-4 w-4" />
          </div>
          <div className="cmms-user-copy">
            <span className="cmms-user-name">Admin Demo</span>
            <span className="cmms-user-email">admin@demo.vn</span>
          </div>
          <ChevronDown className="cmms-user-chevron" />
        </button>
        <div className="cmms-user-popover">
          <button onClick={() => onNavigate("profiles")} type="button">My Account</button>
          <button type="button">Log out</button>
        </div>
      </div>
    </aside>
  );
}
