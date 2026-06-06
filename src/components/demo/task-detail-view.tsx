"use client";

import { ArrowLeft, Calendar, User, ClipboardList, Star, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tasks: Record<string, {
  id: string;
  name: string;
  status: string;
  priority: string;
  description: string;
  assignee: string;
  workOrder: string;
  dueDate: string;
  issueNumber: number;
}> = {
  "TASK-001": {
    id: "TASK-001",
    name: "Kiểm tra động cơ",
    status: "Completed",
    priority: "High",
    description: "Kiểm tra động cơ máy bơm: mức dầu, áp suất, độ rung, nhiệt độ.",
    assignee: "Nguyễn Văn A",
    workOrder: "WO-2024-001",
    dueDate: "2024-01-16",
    issueNumber: 0,
  },
  "TASK-002": {
    id: "TASK-002",
    name: "Thay thế phớt máy",
    status: "In Progress",
    priority: "High",
    description: "Thay thế bộ phớt máy bơm do hư hỏng.",
    assignee: "Nguyễn Văn A",
    workOrder: "WO-2024-001",
    dueDate: "2024-01-18",
    issueNumber: 1,
  },
  "TASK-003": {
    id: "TASK-003",
    name: "Kiểm tra áp suất",
    status: "Pending",
    priority: "Medium",
    description: "Đo áp suất đầu ra máy bơm sau khi thay phớt.",
    assignee: "Lê Văn C",
    workOrder: "WO-2024-001",
    dueDate: "2024-01-20",
    issueNumber: 0,
  },
};

const statusColors: Record<string, "success" | "warning" | "danger" | "default"> = {
  "In Progress": "warning",
  "Pending": "default",
  "Completed": "success",
  "Cancelled": "danger",
  "On Hold": "warning",
};

interface TaskDetailViewProps {
  id: string;
  onBack: () => void;
}

export function TaskDetailView({ id, onBack }: TaskDetailViewProps) {
  const task = tasks[id] || tasks["TASK-001"];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button onClick={onBack} className="cmms-back-button">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>
        <span className="text-gray-400">/</span>
        <span>Tasks</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{task.id}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{task.name}</h1>
          <p className="text-gray-500 text-sm mt-1">Mã: {task.id} · Work Order: {task.workOrder}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-md transition-colors">
            <FileText className="h-4 w-4" />
            Chi tiết
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Trạng thái</p>
              <Badge variant={statusColors[task.status]}>{task.status}</Badge>
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
              <Badge variant={task.priority === "Urgent" ? "danger" : "warning"}>{task.priority}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Người thực hiện</p>
              <p className="text-sm font-medium text-gray-900">{task.assignee}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Hạn</p>
              <p className="text-sm font-medium text-gray-900">{task.dueDate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Mô tả</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">{task.description}</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông tin Work Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Work Order liên quan</p>
              <p className="text-sm font-medium text-blue-600">{task.workOrder}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Issue Number</p>
              <p className="text-sm font-medium text-gray-900">{task.issueNumber}</p>
            </div>
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
                  <p className="text-sm text-gray-900">Cập nhật trạng thái: {task.status}</p>
                  <p className="text-xs text-gray-500">2024-01-17 10:00</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-gray-300 mt-2" />
                <div>
                  <p className="text-sm text-gray-900">Phân công cho {task.assignee}</p>
                  <p className="text-xs text-gray-500">2024-01-15 14:00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
