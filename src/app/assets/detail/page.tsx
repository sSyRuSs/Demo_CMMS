"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, QrCode, FileText, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const asset = {
  id: "AST-2024-001",
  name: "Máy bơm nước #A01",
  code: "AST-2024-001",
  status: "Active",
  category: "Mechanical",
  location: "Kho A - Tầng 1",
  facility: "Nhà máy A",
  description: "Máy bơm nước công suất 5.5KW, lắp đặt năm 2022.",
  installDate: "2022-03-15",
  lastMaintenance: "2024-01-15",
  nextMaintenance: "2024-04-15",
  quantity: 1,
  files: 3,
};

const statusColors: Record<string, "success" | "warning" | "danger" | "default"> = {
  "Active": "success",
  "Maintenance": "warning",
  "Retired": "danger",
};

export default function AssetDetailPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button onClick={() => router.back()} className="cmms-back-button">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>
        <span className="text-gray-400">/</span>
        <span>Assets</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{asset.code}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{asset.name}</h1>
          <p className="text-gray-500 text-sm mt-1">Mã: {asset.code}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-md transition-colors">
            <QrCode className="h-4 w-4" />
            Tạo QR Code
          </button>
        </div>
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
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Cơ sở</p>
                  <p className="text-sm font-medium text-gray-900">{asset.facility}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Ngày lắp đặt</p>
                  <p className="text-sm font-medium text-gray-900">{asset.installDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Bảo trì tiếp theo</p>
                  <p className="text-sm font-medium text-gray-900">{asset.nextMaintenance}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Số lượng</p>
                  <p className="text-sm font-medium text-gray-900">{asset.quantity}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Mô tả</p>
                <p className="text-sm text-gray-700">{asset.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tài liệu đính kèm ({asset.files})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Huong_dan_su_dung.pdf</p>
                      <p className="text-xs text-gray-500">Đã tải lên: 2024-01-10</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Lich_bao_tri.xlsx</p>
                      <p className="text-xs text-gray-500">Đã tải lên: 2024-01-10</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Anh_thiet_bi.jpg</p>
                      <p className="text-xs text-gray-500">Đã tải lên: 2024-01-10</p>
                    </div>
                  </div>
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
                <div className="flex items-center justify-between p-2 border border-gray-100 rounded hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm font-medium text-blue-600">WO-2024-001</span>
                  <Badge variant="warning">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-gray-100 rounded hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm font-medium text-blue-600">WO-2023-045</span>
                  <Badge variant="success">Completed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
