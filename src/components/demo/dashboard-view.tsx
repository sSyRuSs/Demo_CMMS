"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

const kpiData = [
  { title: "Total Work Orders", value: "124", change: "+12%", trend: "up" as const, color: "blue" },
  { title: "Active Tasks", value: "38", change: "+5%", trend: "up" as const, color: "amber" },
  { title: "Assets Health", value: "94%", change: "+2%", trend: "up" as const, color: "green" },
  { title: "Low Stock Items", value: "7", change: "-3", trend: "down" as const, color: "red" },
];

const recentWorkOrders = [
  { id: "WO-2024-001", asset: "Máy bơm nước #A01", status: "In Progress", priority: "High", date: "2024-01-15" },
  { id: "WO-2024-002", asset: "Điều hòa tầng 3", status: "Pending", priority: "Medium", date: "2024-01-15" },
  { id: "WO-2024-003", asset: "Thang máy #B02", status: "Completed", priority: "Urgent", date: "2024-01-14" },
  { id: "WO-2024-004", asset: "Hệ thống điện", status: "In Progress", priority: "Low", date: "2024-01-14" },
];

const statusColors: Record<string, "success" | "warning" | "danger" | "default"> = {
  "In Progress": "warning",
  "Pending": "default",
  "Completed": "success",
};

interface DashboardViewProps {
  onOpenDetail?: (id: string) => void;
}

export function DashboardView({ onOpenDetail }: DashboardViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Tổng quan hệ thống CMMS</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Tìm kiếm..." className="pl-9 w-64" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                </div>
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  kpi.color === "blue" ? "bg-blue-100 text-blue-600" :
                  kpi.color === "amber" ? "bg-amber-100 text-amber-600" :
                  kpi.color === "green" ? "bg-green-100 text-green-600" :
                  "bg-red-100 text-red-600"
                }`}>
                  {kpi.trend === "up" ? <TrendingUp className="h-5 w-5" /> :
                   kpi.trend === "down" ? <AlertTriangle className="h-5 w-5" /> :
                   <CheckCircle2 className="h-5 w-5" />}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs">
                <span className={kpi.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {kpi.change}
                </span>
                <span className="text-gray-400">so với tháng trước</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Work Orders gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Mã WO</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Tài sản</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Trạng thái</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Ưu tiên</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Ngày</th>
              </tr>
            </thead>
            <tbody>
              {recentWorkOrders.map((wo) => (
                <tr
                  key={wo.id}
                  className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
                  onClick={() => onOpenDetail?.(wo.id)}
                >
                  <td className="py-3 px-3 text-sm font-medium text-blue-600">{wo.id}</td>
                  <td className="py-3 px-3 text-sm text-gray-700">{wo.asset}</td>
                  <td className="py-3 px-3"><Badge variant={statusColors[wo.status]}>{wo.status}</Badge></td>
                  <td className="py-3 px-3 text-sm text-gray-700">{wo.priority}</td>
                  <td className="py-3 px-3 text-sm text-gray-500">{wo.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
