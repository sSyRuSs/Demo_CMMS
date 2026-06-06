"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Warehouse, AlertTriangle, TrendingUp, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const inventory = {
  id: "INV-001",
  name: "Bộ lọc dầu",
  code: "FLT-OIL-001",
  category: "Spare Parts",
  warehouse: "Kho A",
  quantity: 45,
  minStock: 10,
  maxStock: 100,
  unit: "pcs",
  unitCost: 25.5,
  supplier: "Công ty TNHH ABC",
  lastRestocked: "2024-01-10",
  description: "Bộ lọc dầu máy bơm, model XYZ-100",
};

const movements = [
  { id: "MOV-001", type: "IN", quantity: 50, date: "2024-01-10", note: "Nhập từ nhà cung cấp ABC" },
  { id: "MOV-002", type: "OUT", quantity: 5, date: "2024-01-14", note: "Xuất cho WO-2024-001" },
];

function getStockStatus(item: typeof inventory) {
  if (item.quantity <= item.minStock) return { label: "Low Stock", variant: "danger" as const };
  if (item.quantity <= item.minStock * 1.5) return { label: "Warning", variant: "warning" as const };
  return { label: "In Stock", variant: "success" as const };
}

export default function InventoryDetailPage() {
  const router = useRouter();
  const stock = getStockStatus(inventory);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button onClick={() => router.back()} className="cmms-back-button">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>
        <span className="text-gray-400">/</span>
        <span>Inventory</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{inventory.id}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{inventory.name}</h1>
          <p className="text-gray-500 text-sm mt-1">Mã: {inventory.code}</p>
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
              <p className="text-xl font-bold text-gray-900">{inventory.quantity} {inventory.unit}</p>
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
              <p className="text-xl font-bold text-gray-900">{inventory.minStock} {inventory.unit}</p>
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
              <p className="text-xl font-bold text-gray-900">{inventory.maxStock} {inventory.unit}</p>
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
              <p className="text-sm font-medium text-gray-900">{inventory.warehouse}</p>
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
                  <p className="text-sm font-medium text-gray-900">{inventory.category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Đơn vị</p>
                  <p className="text-sm font-medium text-gray-900">{inventory.unit}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Giá đơn vị</p>
                  <p className="text-sm font-medium text-gray-900">${inventory.unitCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nhà cung cấp</p>
                  <p className="text-sm font-medium text-gray-900">{inventory.supplier}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nhập kho gần nhất</p>
                  <p className="text-sm font-medium text-gray-900">{inventory.lastRestocked}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Mô tả</p>
                <p className="text-sm text-gray-700">{inventory.description}</p>
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
                  {movements.map((mov) => (
                    <tr key={mov.id} className="border-b border-gray-50">
                      <td className="py-3 px-3 text-sm font-medium text-gray-900">{mov.id}</td>
                      <td className="py-3 px-3">
                        <Badge variant={mov.type === "IN" ? "success" : "warning"}>{mov.type}</Badge>
                      </td>
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
                <p className="text-sm font-medium text-gray-900">{inventory.warehouse}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Nhà cung cấp</p>
                <p className="text-sm font-medium text-gray-900">{inventory.supplier}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Giá đơn vị</p>
                <p className="text-sm font-medium text-gray-900">${inventory.unitCost.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
