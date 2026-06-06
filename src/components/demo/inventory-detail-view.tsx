"use client";

import { ArrowLeft, Warehouse, AlertTriangle, TrendingUp, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const inventoryItems: Record<string, {
  id: string;
  name: string;
  category: string;
  warehouse: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  unit: string;
  unitCost: number;
  supplier: string;
  description: string;
  movements: { id: string; type: string; quantity: number; date: string; note: string }[];
}> = {
  "INV-001": {
    id: "INV-001",
    name: "Bộ lọc dầu",
    category: "Spare Parts",
    warehouse: "Kho A",
    quantity: 45,
    minStock: 10,
    maxStock: 100,
    unit: "pcs",
    unitCost: 25.5,
    supplier: "Công ty TNHH ABC",
    description: "Bộ lọc dầu máy bơm, model XYZ-100",
    movements: [
      { id: "MOV-001", type: "IN", quantity: 50, date: "2024-01-10", note: "Nhập từ nhà cung cấp ABC" },
      { id: "MOV-002", type: "OUT", quantity: 5, date: "2024-01-14", note: "Xuất cho WO-2024-001" },
    ],
  },
  "INV-002": {
    id: "INV-002",
    name: "Dầu nhớt 5W-30",
    category: "Lubricant",
    warehouse: "Kho A",
    quantity: 8,
    minStock: 20,
    maxStock: 200,
    unit: "liters",
    unitCost: 12.0,
    supplier: "Công ty XYZ",
    description: "Dầu nhớt tổng hợp 5W-30",
    movements: [
      { id: "MOV-101", type: "OUT", quantity: 25, date: "2024-01-12", note: "Xuất cho bảo trì" },
    ],
  },
  "INV-003": {
    id: "INV-003",
    name: "Công tắc điện",
    category: "Electrical",
    warehouse: "Kho B",
    quantity: 120,
    minStock: 30,
    maxStock: 500,
    unit: "pcs",
    unitCost: 3.5,
    supplier: "Công ty DEF",
    description: "Công tắc đơn 1 chiều 10A",
    movements: [
      { id: "MOV-201", type: "IN", quantity: 200, date: "2024-01-08", note: "Nhập mới" },
    ],
  },
};

function getStockStatus(item: typeof inventoryItems[string]) {
  if (item.quantity <= item.minStock) return { label: "Low Stock", variant: "danger" as const };
  if (item.quantity <= item.minStock * 1.5) return { label: "Warning", variant: "warning" as const };
  return { label: "In Stock", variant: "success" as const };
}

interface InventoryDetailViewProps {
  id: string;
  onBack: () => void;
}

export function InventoryDetailView({ id, onBack }: InventoryDetailViewProps) {
  const item = inventoryItems[id] || inventoryItems["INV-001"];
  const stock = getStockStatus(item);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button onClick={onBack} className="cmms-back-button">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>
        <span className="text-gray-400">/</span>
        <span>Inventory</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{item.id}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
          <p className="text-gray-500 text-sm mt-1">Mã: {item.id}</p>
        </div>
        <Badge variant={stock.variant}>{stock.label}</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Tồn kho hiện tại</p>
              <p className="text-xl font-bold text-gray-900">{item.quantity} {item.unit}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Mức tối thiểu</p>
              <p className="text-xl font-bold text-gray-900">{item.minStock} {item.unit}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Mức tối đa</p>
              <p className="text-xl font-bold text-gray-900">{item.maxStock} {item.unit}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
              <Warehouse className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Kho</p>
              <p className="text-sm font-medium text-gray-900">{item.warehouse}</p>
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
                  <p className="text-xs text-gray-500 mb-1">Danh mục</p>
                  <p className="text-sm font-medium text-gray-900">{item.category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Đơn vị</p>
                  <p className="text-sm font-medium text-gray-900">{item.unit}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Giá đơn vị</p>
                  <p className="text-sm font-medium text-gray-900">${item.unitCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nhà cung cấp</p>
                  <p className="text-sm font-medium text-gray-900">{item.supplier}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Mô tả</p>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lịch sử nhập/xuất kho</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Mã</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Loại</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Số lượng</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Ngày</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {item.movements.map((mov) => (
                    <tr key={mov.id} className="border-b border-gray-50">
                      <td className="py-3 px-3 text-sm font-medium text-gray-900">{mov.id}</td>
                      <td className="py-3 px-3"><Badge variant={mov.type === "IN" ? "success" : "warning"}>{mov.type}</Badge></td>
                      <td className="py-3 px-3 text-sm text-gray-700 font-medium">{mov.quantity}</td>
                      <td className="py-3 px-3 text-sm text-gray-500">{mov.date}</td>
                      <td className="py-3 px-3 text-sm text-gray-600">{mov.note}</td>
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
              <CardTitle className="text-base">Thông tin kho</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Kho lưu trữ</p>
                <p className="text-sm font-medium text-gray-900">{item.warehouse}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Nhà cung cấp</p>
                <p className="text-sm font-medium text-gray-900">{item.supplier}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Giá đơn vị</p>
                <p className="text-sm font-medium text-gray-900">${item.unitCost.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
