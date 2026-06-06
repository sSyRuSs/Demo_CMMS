"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User, MapPin, Star, FileText, Printer, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const workOrder = {
  id: "WO-2024-001",
  name: "Bảo trì định kỳ - Máy bơm nước #A01",
  status: "In Progress",
  priority: "High",
  asset: "Máy bơm nước #A01",
  assetId: "AST-2024-001",
  location: "Kho A - Tầng 1",
  description: "Kiểm tra định kỳ máy bơm nước, thay thế phớt nếu cần, kiểm tra áp suất và độ rung.",
  startDate: "2024-01-15",
  completeDate: "2024-01-20",
  assignedTo: "Nguyễn Văn A",
  createdBy: "Trần Văn B",
  createdAt: "2024-01-15",
};

const tasks = [
  { id: "TASK-001", name: "Kiểm tra động cơ", status: "Completed", assignee: "Nguyễn Văn A", dueDate: "2024-01-16" },
  { id: "TASK-002", name: "Thay thế phớt máy", status: "In Progress", assignee: "Nguyễn Văn A", dueDate: "2024-01-18" },
  { id: "TASK-003", name: "Kiểm tra áp suất", status: "Pending", assignee: "Lê Văn C", dueDate: "2024-01-20" },
];

const statusColors: Record<string, "success" | "warning" | "danger" | "default"> = {
  "In Progress": "warning",
  "Pending": "default",
  "Completed": "success",
  "Cancelled": "danger",
};

export default function WorkOrderDetailPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button onClick={() => router.back()} className="cmms-back-button">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>
        <span className="text-gray-400">/</span>
        <span>Work Orders</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{workOrder.id}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{workOrder.name}</h1>
          <p className="text-gray-500 text-sm mt-1">Mã: {workOrder.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-md transition-colors">
            <Printer className="h-4 w-4" />
            In
          </button>
          <button className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-md transition-colors">
            <Share2 className="h-4 w-4" />
            Chia sẻ
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
              <Badge variant={statusColors[workOrder.status]}>{workOrder.status}</Badge>
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
              <Badge variant={workOrder.priority === "Urgent" ? "danger" : "warning"}>{workOrder.priority}</Badge>
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
              <p className="text-sm font-medium text-gray-900">{workOrder.completeDate}</p>
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
              <p className="text-sm font-medium text-gray-900">{workOrder.assignedTo}</p>
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
                  <p className="text-sm font-medium text-gray-900">{workOrder.asset}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Vị trí</p>
                  <p className="text-sm font-medium text-gray-900">{workOrder.location}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Ngày bắt đầu</p>
                  <p className="text-sm font-medium text-gray-900">{workOrder.startDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Ngày tạo</p>
                  <p className="text-sm font-medium text-gray-900">{workOrder.createdAt}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Mô tả</p>
                <p className="text-sm text-gray-700">{workOrder.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tasks ({tasks.length})</CardTitle>
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
                  {tasks.map((task) => (
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
              <CardTitle className="text-base">Thông tin tài sản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Mã tài sản</p>
                <p className="text-sm font-medium text-blue-600">{workOrder.assetId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Tên</p>
                <p className="text-sm font-medium text-gray-900">{workOrder.asset}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Vị trí</p>
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {workOrder.location}
                </p>
              </div>
              <button
                onClick={() => router.push(`/assets`)}
                className="w-full mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Xem chi tiết tài sản →
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lịch sử cập nhật</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                  <div>
                    <p className="text-sm text-gray-900">Cập nhật trạng thái: In Progress</p>
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
