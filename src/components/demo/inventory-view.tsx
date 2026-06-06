"use client";

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
import { Search, Plus, AlertTriangle, Package, Filter } from "lucide-react";

const inventoryItems = [
  { id: "INV-001", name: "Bộ lọc dầu", category: "Spare Parts", warehouse: "Kho A", quantity: 45, minStock: 10, unit: "pcs" },
  { id: "INV-002", name: "Dầu nhớt 5W-30", category: "Lubricant", warehouse: "Kho A", quantity: 8, minStock: 20, unit: "liters" },
  { id: "INV-003", name: "Công tắc điện", category: "Electrical", warehouse: "Kho B", quantity: 120, minStock: 30, unit: "pcs" },
  { id: "INV-004", name: "Ống nhựa PVC", category: "Plumbing", warehouse: "Kho A", quantity: 3, minStock: 15, unit: "meters" },
  { id: "INV-005", name: "Bulong M10", category: "Hardware", warehouse: "Kho B", quantity: 500, minStock: 100, unit: "pcs" },
];

function getStockStatus(item: typeof inventoryItems[0]) {
  if (item.quantity <= item.minStock) return { label: "Low Stock", variant: "danger" as const };
  if (item.quantity <= item.minStock * 1.5) return { label: "Warning", variant: "warning" as const };
  return { label: "In Stock", variant: "success" as const };
}

interface InventoryViewProps {
  onOpenDetail?: (id: string) => void;
}

export function InventoryView({ onOpenDetail }: InventoryViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-500 text-sm mt-1">Quản lý kho phụ tùng và vật tư</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
          <Plus className="h-4 w-4" />
          Thêm vật tư
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Tổng vật tư</p>
              <p className="text-xl font-bold text-gray-900">156</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Cảnh báo tồn kho</p>
              <p className="text-xl font-bold text-gray-900">7</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Sắp hết hàng</p>
              <p className="text-xl font-bold text-gray-900">2</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Tìm kiếm vật tư..." className="pl-9" />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <button className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-md transition-colors">
                  <Filter className="h-4 w-4" />
                  Filter Inventory
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto px-4 py-4">
                <SheetHeader className="space-y-3">
                  <SheetTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filter Inventory
                  </SheetTitle>
                  <SheetDescription>
                    Apply filters to refine your inventory view
                  </SheetDescription>
                </SheetHeader>
                <div className="cmms-filter-section">
                  <FilterGroup title="Stock status" options={["All", "In Stock", "Warning", "Low Stock"]} />
                  <FilterGroup title="Warehouse" options={["All warehouses", "Kho A", "Kho B", "Kho trung tâm"]} />
                  <FilterGroup title="Category" options={["All categories", "Spare Parts", "Lubricant", "Electrical", "Hardware"]} />
                  <FilterGroup title="Sort quantity" options={["Highest first", "Lowest first", "None"]} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Mã</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Tên</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Danh mục</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Kho</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">SL</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Min Stock</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => {
                const stock = getStockStatus(item);
                return (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => onOpenDetail?.(item.id)}>
                    <td className="py-3 px-4 text-sm font-medium text-blue-600">{item.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{item.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{item.category}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{item.warehouse}</td>
                    <td className="py-3 px-4 text-sm text-gray-700 font-medium">{item.quantity} {item.unit}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{item.minStock}</td>
                    <td className="py-3 px-4"><Badge variant={stock.variant}>{stock.label}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
          {(option.startsWith("All") || option === "None") && <Badge variant="secondary">Default</Badge>}
        </button>
      ))}
    </div>
  );
}
