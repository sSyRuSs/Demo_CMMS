"use client";

import { useState } from "react";
import { Sidebar, type View } from "@/components/demo/sidebar";
import { DashboardView } from "@/components/demo/dashboard-view";
import { WorkOrdersView } from "@/components/demo/workorders-view";
import { AssetsView } from "@/components/demo/assets-view";
import { InventoryView } from "@/components/demo/inventory-view";
import { WorkOrderDetailView } from "@/components/demo/workorder-detail-view";
import { AssetDetailView } from "@/components/demo/asset-detail-view";
import { InventoryDetailView } from "@/components/demo/inventory-detail-view";
import { ModuleDetailView, ModuleView } from "@/components/demo/module-view";
import { moduleConfigs } from "@/components/demo/mock-modules";
import type { KanbanCard } from "@/components/demo/kanban-board";
import { ResponseIssuesView } from "@/components/demo/response-issues-view";

const detailToList: Partial<Record<View, View>> = {
  "task-detail": "tasks",
  "purchase-request-detail": "purchase-requests",
  "stock-movement-detail": "stock-movement",
  "vendor-detail": "vendors",
  "warehouse-detail": "warehouses",
  "inventory-category-detail": "inventory-categories",
  "user-detail": "users",
  "facility-detail": "facilities",
  "enterprise-detail": "enterprises",
  "issue-detail": "issues",
};

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const navigate = (view: View) => {
    setCurrentView(view);
    setSelectedId(null);
  };

  const openDetail = (view: View, id: string) => {
    setCurrentView(view);
    setSelectedId(id);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} onNavigate={navigate} />
      <main className="flex-1 overflow-auto p-6">
        {currentView === "dashboard" && <DashboardView onOpenDetail={(id) => openDetail("work-order-detail", id)} />}
        {currentView === "work-orders" && (
          <WorkOrdersView onOpenDetail={(id) => openDetail("work-order-detail", id)} />
        )}
        {currentView === "work-order-detail" && selectedId && (
          <WorkOrderDetailView id={selectedId} onBack={() => navigate("work-orders")} />
        )}
        {currentView === "assets" && (
          <AssetsView onOpenDetail={(id) => openDetail("asset-detail", id)} />
        )}
        {currentView === "asset-detail" && selectedId && (
          <AssetDetailView id={selectedId} onBack={() => navigate("assets")} />
        )}
        {currentView === "inventory" && (
          <InventoryView onOpenDetail={(id) => openDetail("inventory-detail", id)} />
        )}
        {currentView === "inventory-detail" && selectedId && (
          <InventoryDetailView id={selectedId} onBack={() => navigate("inventory")} />
        )}
        {currentView === "response-issues" && <ResponseIssuesView />}
        {renderGenericView(currentView, selectedId, openDetail, navigate)}
      </main>
    </div>
  );
}

function renderGenericView(
  currentView: View,
  selectedId: string | null,
  openDetail: (view: View, id: string) => void,
  navigate: (view: View) => void,
) {
  if (currentView === "response-issues") return null;

  if (currentView in moduleConfigs) {
    const config = moduleConfigs[currentView];
    if (!config) return null;
    const detailView = getDetailView(currentView);

    return (
      <ModuleView
        config={config}
        onOpenDetail={detailView ? (id) => openDetail(detailView, id) : undefined}
        kanbanCards={currentView === "tasks" ? taskKanbanCards : undefined}
      />
    );
  }

  const parentView = detailToList[currentView];
  if (!parentView || !selectedId) return null;

  const config = moduleConfigs[parentView];
  if (!config) return null;

  return (
    <ModuleDetailView
      config={config}
      id={selectedId}
      onBack={() => navigate(parentView)}
    />
  );
}

function getDetailView(view: View): View | null {
  const entries = Object.entries(detailToList) as [View, View][];
  return entries.find(([, parent]) => parent === view)?.[0] ?? null;
}

const taskKanbanCards: KanbanCard[] = [
  {
    id: "TSK-001",
    title: "Thay bạc đạn bơm A01",
    status: "In_progress",
    priority: "HIGH",
    location: "Máy bơm A01",
    assignee: "Nguyễn Văn A",
    description: "Tháo cụm bơm, kiểm tra rung động và thay bạc đạn theo checklist.",
    issueNumber: 301,
    date: "Jun 5",
    starred: true,
  },
  {
    id: "TSK-002",
    title: "Vệ sinh lưới lọc AHU",
    status: "In_open",
    priority: "MEDIUM",
    location: "AHU-03",
    assignee: "Trần Văn B",
    description: "Vệ sinh lưới lọc, kiểm tra áp suất gió và ghi nhận ảnh sau bảo trì.",
    issueNumber: 302,
    date: "Jun 6",
  },
  {
    id: "TSK-003",
    title: "Nghiệm thu thang máy",
    status: "Completed",
    priority: "LOW",
    location: "Lift B02",
    assignee: "Lê Văn C",
    description: "Kiểm tra cabin, tải trọng và ký xác nhận nghiệm thu.",
    issueNumber: 303,
    date: "Jun 4",
  },
  {
    id: "TSK-004",
    title: "Kiểm tra UPS battery fault",
    status: "Overdue",
    priority: "HIGH",
    location: "Data room",
    assignee: "Phạm Văn D",
    description: "UPS cảnh báo battery fault, cần test tải và đề xuất vật tư thay thế.",
    issueNumber: 304,
    date: "Jun 3",
    starred: true,
  },
  {
    id: "TSK-005",
    title: "Chờ phê duyệt vật tư HVAC",
    status: "Requested",
    priority: "MEDIUM",
    location: "Tầng 5",
    assignee: "Hoàng Văn E",
    description: "Task đang chờ PR bộ lọc AHU được duyệt trước khi triển khai.",
    issueNumber: 305,
    date: "Jun 7",
  },
  {
    id: "TSK-006",
    title: "Phê duyệt kế hoạch PCCC",
    status: "Approved",
    priority: "LOW",
    location: "Hầm B2",
    assignee: "Safety Team",
    description: "Kế hoạch kiểm tra PCCC tháng 6 đã được duyệt và chờ lịch thực hiện.",
    issueNumber: 306,
    date: "Jun 8",
  },
];
