"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { KanbanBoard, type KanbanCard } from "@/components/demo/kanban-board";
import { Search, Plus, Filter, Columns, Table } from "lucide-react";

const workOrders = [
  { id: "WO-2024-001", name: "Bảo trì định kỳ - Máy bơm #A01", status: "In Progress", priority: "High", asset: "Máy bơm nước #A01", assignedTo: "Nguyễn Văn A", dueDate: "2024-01-20" },
  { id: "WO-2024-002", name: "Sửa chữa điều hòa tầng 3", status: "Pending", priority: "Medium", asset: "Điều hòa Daikin", assignedTo: "Trần Văn B", dueDate: "2024-01-18" },
  { id: "WO-2024-003", name: "Kiểm tra thang máy #B02", status: "Completed", priority: "Urgent", asset: "Thang máy Otis", assignedTo: "Lê Văn C", dueDate: "2024-01-15" },
  { id: "WO-2024-004", name: "Bảo trì hệ thống điện", status: "In Progress", priority: "Low", asset: "Tủ điện trung tâm", assignedTo: "Phạm Văn D", dueDate: "2024-01-25" },
  { id: "WO-2024-005", name: "Thay thế bộ lọc không khí", status: "Pending", priority: "Medium", asset: "HVAC System", assignedTo: "Hoàng Văn E", dueDate: "2024-01-22" },
];

const priorityColors: Record<string, "default" | "success" | "warning" | "danger"> = {
  "Low": "default",
  "Medium": "warning",
  "High": "warning",
  "Urgent": "danger",
};

const statusColors: Record<string, "success" | "warning" | "danger" | "default"> = {
  "In Progress": "warning",
  "Pending": "default",
  "Completed": "success",
  "Cancelled": "danger",
};

interface WorkOrdersViewProps {
  onOpenDetail?: (id: string) => void;
}

export function WorkOrdersView({ onOpenDetail }: WorkOrdersViewProps) {
  const [viewType, setViewType] = useState<"table" | "kanban">("table");
  const kanbanCards = useMemo<KanbanCard[]>(
    () =>
      workOrders.map((wo, index) => ({
        id: wo.id,
        title: wo.name,
        status:
          wo.status === "Completed"
            ? "Completed"
            : wo.status === "In Progress"
              ? "In_progress"
              : index === 4
                ? "Requested"
                : "In_open",
        priority: wo.priority === "High" || wo.priority === "Urgent" ? "HIGH" : wo.priority === "Medium" ? "MEDIUM" : "LOW",
        location: wo.asset,
        assignee: wo.assignedTo,
        description: `Work order demo cho ${wo.asset}. Theo dõi task, vật tư và nghiệm thu.`,
        issueNumber: index + 101,
        date: wo.dueDate,
        starred: wo.priority === "Urgent",
      })),
    [],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Work Orders</h1>
          <p className="text-gray-500 text-sm mt-1">Quản lý yêu cầu bảo trì</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
          <Plus className="h-4 w-4" />
          Tạo Work Order
        </button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="cmms-view-toggle">
              <button
                className={viewType === "table" ? "cmms-view-toggle-active" : ""}
                onClick={() => setViewType("table")}
                type="button"
              >
                <Table className="h-4 w-4" />
                Table
              </button>
              <button
                className={viewType === "kanban" ? "cmms-view-toggle-active" : ""}
                onClick={() => setViewType("kanban")}
                type="button"
              >
                <Columns className="h-4 w-4" />
                Kanban
              </button>
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Tìm kiếm work order..." className="pl-9" />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <button className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-md transition-colors">
                  <Filter className="h-4 w-4" />
                  Lọc
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:w-[580px] md:w-[640px] lg:w-[700px] overflow-y-auto px-4 py-4">
                <SheetHeader className="space-y-3">
                  <SheetTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Filter className="h-5 w-5" />
                    Filter Work Orders
                  </SheetTitle>
                  <SheetDescription className="text-sm sm:text-base">
                    Apply filters to refine your work orders view
                  </SheetDescription>
                </SheetHeader>
                <div className="cmms-filter-section">
                  <FilterGroup title="Status" options={["All", "Pending", "In Progress", "Completed", "Cancelled"]} />
                  <FilterGroup title="Priority" options={["All", "Low", "Medium", "High", "Urgent"]} />
                  <FilterGroup title="Assigned team" options={["All teams", "MEP", "HVAC", "Safety", "Warehouse"]} />
                  <div className="flex gap-2">
                    <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" type="button">Apply filters</button>
                    <button className="inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" type="button">Reset</button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardHeader>
        <CardContent>
          {viewType === "kanban" ? (
            <KanbanBoard title="Work Orders Kanban" cards={kanbanCards} onOpenDetail={onOpenDetail} />
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Mã WO</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Tên</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Tài sản</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Ưu tiên</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Người phụ trách</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Hạn</th>
                </tr>
              </thead>
              <tbody>
                {workOrders.map((wo) => (
                  <tr key={wo.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => onOpenDetail?.(wo.id)}>
                    <td className="py-3 px-4 text-sm font-medium text-blue-600">{wo.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{wo.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{wo.asset}</td>
                    <td className="py-3 px-4"><Badge variant={statusColors[wo.status]}>{wo.status}</Badge></td>
                    <td className="py-3 px-4"><Badge variant={priorityColors[wo.priority]}>{wo.priority}</Badge></td>
                    <td className="py-3 px-4 text-sm text-gray-600">{wo.assignedTo}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{wo.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function FilterGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <div className="cmms-filter-group">
      <div className="cmms-filter-label">{title}</div>
      {options.map((option) => (
        <button className="cmms-filter-option" type="button" key={option}>
          <span>{option}</span>
          {option === "All" && <Badge variant="secondary">Default</Badge>}
        </button>
      ))}
    </div>
  );
}
