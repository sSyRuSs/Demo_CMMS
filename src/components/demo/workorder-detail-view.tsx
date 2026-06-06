"use client";

import { ArrowLeft, Calendar, User, Star, FileText, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const workOrders: Record<string, {
  id: string;
  name: string;
  status: string;
  priority: string;
  asset: string;
  location: string;
  description: string;
  completeDate: string;
  assignedTo: string;
  tasks: { id: string; name: string; status: string; assignee: string; dueDate: string }[];
}> = {
  "WO-2024-001": {
    id: "WO-2024-001",
    name: "Bảo trì định kỳ - Máy bơm nước #A01",
    status: "In Progress",
    priority: "High",
    asset: "Máy bơm nước #A01",
    location: "Kho A - Tầng 1",
    description: "Kiểm tra định kỳ máy bơm nước, thay thế phớt nếu cần, kiểm tra áp suất và độ rung.",
    completeDate: "2024-01-20",
    assignedTo: "Nguyễn Văn A",
    tasks: [
      { id: "TASK-001", name: "Kiểm tra động cơ", status: "Completed", assignee: "Nguyễn Văn A", dueDate: "2024-01-16" },
      { id: "TASK-002", name: "Thay thế phớt máy", status: "In Progress", assignee: "Nguyễn Văn A", dueDate: "2024-01-18" },
      { id: "TASK-003", name: "Kiểm tra áp suất", status: "Pending", assignee: "Lê Văn C", dueDate: "2024-01-20" },
    ],
  },
  "WO-2024-002": {
    id: "WO-2024-002",
    name: "Sửa chữa điều hòa tầng 3",
    status: "Pending",
    priority: "Medium",
    asset: "Điều hòa Daikin",
    location: "Văn phòng tầng 3",
    description: "Không lạnh, kiểm tra gas và board điều khiển.",
    completeDate: "2024-01-18",
    assignedTo: "Trần Văn B",
    tasks: [
      { id: "TASK-101", name: "Kiểm tra gas", status: "Pending", assignee: "Trần Văn B", dueDate: "2024-01-18" },
    ],
  },
  "WO-2024-003": {
    id: "WO-2024-003",
    name: "Kiểm tra thang máy #B02",
    status: "Completed",
    priority: "Urgent",
    asset: "Thang máy Otis",
    location: "Khu B",
    description: "Bảo trì định kỳ theo lịch.",
    completeDate: "2024-01-15",
    assignedTo: "Lê Văn C",
    tasks: [
      { id: "TASK-201", name: "Kiểm tra cabin", status: "Completed", assignee: "Lê Văn C", dueDate: "2024-01-14" },
      { id: "TASK-202", name: "Kiểm tra trọng tải", status: "Completed", assignee: "Lê Văn C", dueDate: "2024-01-15" },
    ],
  },
};

const statusColors: Record<string, "success" | "warning" | "danger" | "default"> = {
  "In Progress": "warning",
  "Pending": "default",
  "Completed": "success",
  "Cancelled": "danger",
};

interface WorkOrderDetailViewProps {
  id: string;
  onBack: () => void;
}

export function WorkOrderDetailView({ id, onBack }: WorkOrderDetailViewProps) {
  const wo = workOrders[id] || workOrders["WO-2024-001"];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button onClick={onBack} className="cmms-back-button">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>
        <span className="text-gray-400">/</span>
        <span>Work Orders</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{wo.id}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{wo.name}</h1>
          <p className="text-gray-500 text-sm mt-1">Mã: {wo.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-md transition-colors">
            <Printer className="h-4 w-4" />
            In
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Trạng thái</p>
              <Badge variant={statusColors[wo.status]}>{wo.status}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Ưu tiên</p>
              <Badge variant={wo.priority === "Urgent" ? "danger" : "warning"}>{wo.priority}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Hạn hoàn thành</p>
              <p className="text-sm font-medium text-gray-900">{wo.completeDate}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Phụ trách</p>
              <p className="text-sm font-medium text-gray-900">{wo.assignedTo}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin chi tiết</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tài sản</p>
                  <p className="text-sm font-medium text-gray-900">{wo.asset}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Vị trí</p>
                  <p className="text-sm font-medium text-gray-900">{wo.location}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Mô tả</p>
                <p className="text-sm text-gray-700">{wo.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tasks ({wo.tasks.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Mã</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Tên</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Trạng thái</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Người thực hiện</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Hạn</th>
                  </tr>
                </thead>
                <tbody>
                  {wo.tasks.map((task) => (
                    <tr key={task.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-3 text-sm font-medium text-blue-600">{task.id}</td>
                      <td className="py-3 px-3 text-sm text-gray-700">{task.name}</td>
                      <td className="py-3 px-3"><Badge variant={statusColors[task.status]}>{task.status}</Badge></td>
                      <td className="py-3 px-3 text-sm text-gray-600">{task.assignee}</td>
                      <td className="py-3 px-3 text-sm text-gray-500">{task.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lịch sử cập nhật</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                  <div>
                    <p className="text-sm text-gray-900">Cập nhật trạng thái: {wo.status}</p>
                    <p className="text-xs text-gray-500">2024-01-16 09:30</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-gray-300 mt-2" />
                  <div>
                    <p className="text-sm text-gray-900">Tạo Work Order</p>
                    <p className="text-xs text-gray-500">2024-01-15 14:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
