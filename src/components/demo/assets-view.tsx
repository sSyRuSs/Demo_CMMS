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
import { Search, Plus, Download, Filter } from "lucide-react";

const assets = [
  { id: "AST-2024-001", name: "Máy bơm nước #A01", category: "Mechanical", location: "Kho A - Tầng 1", status: "Active", qr: true },
  { id: "AST-2024-002", name: "Điều hòa Daikin FTKS35", category: "HVAC", location: "Văn phòng tầng 3", status: "Active", qr: true },
  { id: "AST-2024-003", name: "Thang máy Otis #B02", category: "Elevator", location: "Khu B", status: "Maintenance", qr: true },
  { id: "AST-2024-004", name: "Tủ điện trung tâm", category: "Electrical", location: "Phòng kỹ thuật", status: "Active", qr: false },
  { id: "AST-2024-005", name: "Hệ thống phun Sprinkler", category: "Fire Safety", location: "Toàn bộ tòa nhà", status: "Active", qr: true },
];

const statusColors: Record<string, "success" | "warning" | "danger" | "default"> = {
  "Active": "success",
  "Maintenance": "warning",
  "Retired": "danger",
};

interface AssetsViewProps {
  onOpenDetail?: (id: string) => void;
}

export function AssetsView({ onOpenDetail }: AssetsViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assets</h1>
          <p className="text-gray-500 text-sm mt-1">Quản lý tài sản và thiết bị</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-md transition-colors">
            <Download className="h-4 w-4" />
            Export Excel
          </button>
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
            <Plus className="h-4 w-4" />
            Thêm Asset
          </button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Tìm kiếm tài sản..." className="pl-9" />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <button className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-md transition-colors">
                  <Filter className="h-4 w-4" />
                  Filter Assets
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto px-4 py-4">
                <SheetHeader className="space-y-3">
                  <SheetTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filter Assets
                  </SheetTitle>
                  <SheetDescription>Apply filters to refine your assets view</SheetDescription>
                </SheetHeader>
                <div className="cmms-filter-section">
                  <FilterGroup title="Sort by Creation Date" options={["Newest first", "Oldest first", "None"]} />
                  <FilterGroup title="Facility" options={["All facilities", "Tòa nhà A", "Kho trung tâm", "Khu kỹ thuật"]} />
                  <FilterGroup title="Asset Category" options={["All categories", "Mechanical", "HVAC", "Electrical", "Fire Safety"]} />
                  <FilterGroup title="Parent Asset" options={["All assets", "Máy bơm nước #A01", "Thang máy Otis #B02"]} />
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
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Vị trí</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">QR Code</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => onOpenDetail?.(asset.id)}>
                  <td className="py-3 px-4 text-sm font-medium text-blue-600">{asset.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{asset.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{asset.category}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{asset.location}</td>
                  <td className="py-3 px-4"><Badge variant={statusColors[asset.status]}>{asset.status}</Badge></td>
                  <td className="py-3 px-4">
                    {asset.qr ? <span className="text-xs text-green-600 font-medium">✓ Có sẵn</span> : <span className="text-xs text-gray-400">Chưa tạo</span>}
                  </td>
                </tr>
              ))}
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
