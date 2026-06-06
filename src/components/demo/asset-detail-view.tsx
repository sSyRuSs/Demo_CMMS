"use client";

import { ArrowLeft, Calendar, MapPin, QrCode, FileText, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const assets: Record<string, {
  id: string;
  name: string;
  status: string;
  category: string;
  location: string;
  description: string;
  lastMaintenance: string;
  files: number;
  relatedWO: { id: string; status: string }[];
}> = {
  "AST-2024-001": {
    id: "AST-2024-001",
    name: "Máy bơm nước #A01",
    status: "Active",
    category: "Mechanical",
    location: "Kho A - Tầng 1",
    description: "Máy bơm nước công suất 5.5KW, lắp đặt năm 2022.",
    lastMaintenance: "2024-01-15",
    files: 3,
    relatedWO: [
      { id: "WO-2024-001", status: "In Progress" },
      { id: "WO-2023-045", status: "Completed" },
    ],
  },
  "AST-2024-002": {
    id: "AST-2024-002",
    name: "Điều hòa Daikin FTKS35",
    status: "Active",
    category: "HVAC",
    location: "Văn phòng tầng 3",
    description: "Điều hòa treo tường 1.5 HP.",
    lastMaintenance: "2023-12-20",
    files: 2,
    relatedWO: [
      { id: "WO-2024-002", status: "Pending" },
    ],
  },
  "AST-2024-003": {
    id: "AST-2024-003",
    name: "Thang máy Otis #B02",
    status: "Maintenance",
    category: "Elevator",
    location: "Khu B",
    description: "Thang máy 8 tầng, tải trọng 1000kg.",
    lastMaintenance: "2024-01-10",
    files: 5,
    relatedWO: [
      { id: "WO-2024-003", status: "Completed" },
    ],
  },
};

const statusColors: Record<string, "success" | "warning" | "danger" | "default"> = {
  "Active": "success",
  "Maintenance": "warning",
  "Retired": "danger",
};

interface AssetDetailViewProps {
  id: string;
  onBack: () => void;
}

export function AssetDetailView({ id, onBack }: AssetDetailViewProps) {
  const asset = assets[id] || assets["AST-2024-001"];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button onClick={onBack} className="cmms-back-button">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>
        <span className="text-gray-400">/</span>
        <span>Assets</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{asset.id}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{asset.name}</h1>
          <p className="text-gray-500 text-sm mt-1">Mã: {asset.id}</p>
        </div>
        <button className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-md transition-colors">
          <QrCode className="h-4 w-4" />
          Tạo QR Code
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Trạng thái</p>
              <Badge variant={statusColors[asset.status]}>{asset.status}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Danh mục</p>
              <p className="text-sm font-medium text-gray-900">{asset.category}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Vị trí</p>
              <p className="text-sm font-medium text-gray-900">{asset.location}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Bảo trì gần nhất</p>
              <p className="text-sm font-medium text-gray-900">{asset.lastMaintenance}</p>
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
              <div>
                <p className="text-xs text-gray-500 mb-1">Mô tả</p>
                <p className="text-sm text-gray-700">{asset.description}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Tài liệu đính kèm ({asset.files})</p>
                <div className="space-y-2 mt-1">
                  {Array.from({ length: asset.files }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 border border-gray-100 rounded-lg">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">tailieu_{i + 1}.pdf</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">QR Code</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-32 w-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <QrCode className="h-16 w-16 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">Quét để xem thông tin tài sản</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Work Orders liên quan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {asset.relatedWO.map((wo) => (
                  <div key={wo.id} className="flex items-center justify-between p-2 border border-gray-100 rounded hover:bg-gray-50 cursor-pointer">
                    <span className="text-sm font-medium text-blue-600">{wo.id}</span>
                    <Badge variant={statusColors[wo.status]}>{wo.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
