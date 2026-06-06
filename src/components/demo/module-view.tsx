"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { KanbanBoard, type KanbanCard } from "@/components/demo/kanban-board";
import {
  ArrowLeft,
  CalendarDays,
  Columns,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Table,
  Upload,
} from "lucide-react";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "secondary";

export type DemoRow = {
  id: string;
  name: string;
  status: string;
  owner: string;
  location: string;
  date: string;
  metric: string;
  note: string;
};

export type ModuleConfig = {
  title: string;
  description: string;
  primaryAction: string;
  columns: [string, string, string, string, string, string];
  rows: DemoRow[];
  stats: { label: string; value: string; tone: "blue" | "green" | "amber" | "red" }[];
  features: string[];
  detailTitle?: string;
};

const toneClasses = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-700",
};

const statusVariant: Record<string, BadgeVariant> = {
  Active: "success",
  Approved: "success",
  Completed: "success",
  Available: "success",
  Online: "success",
  Scheduled: "warning",
  "In Progress": "warning",
  Pending: "default",
  Draft: "default",
  Warning: "warning",
  "Low Stock": "danger",
  Blocked: "danger",
  Failed: "danger",
};

export function ModuleView({
  config,
  onOpenDetail,
  kanbanCards,
}: {
  config: ModuleConfig;
  onOpenDetail?: (id: string) => void;
  kanbanCards?: KanbanCard[];
}) {
  const [quickReviewRow, setQuickReviewRow] = useState<DemoRow | null>(null);
  const [viewType, setViewType] = useState<"table" | "kanban">("table");
  const hasKanban = Boolean(kanbanCards?.length);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{config.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            <Upload className="h-4 w-4" />
            Import
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            {config.primaryAction}
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {config.stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneClasses[stat.tone]}`}>
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-wrap items-center gap-3">
            {hasKanban && (
              <div className="cmms-view-toggle">
                <button
                  className={viewType === "table" ? "cmms-view-toggle-active" : ""}
                  onClick={() => setViewType("table")}
                  type="button"
                >
                  <Table className="h-4 w-4" />
                  Table
                </button>
                <button
                  className={viewType === "kanban" ? "cmms-view-toggle-active" : ""}
                  onClick={() => setViewType("kanban")}
                  type="button"
                >
                  <Columns className="h-4 w-4" />
                  Kanban
                </button>
              </div>
            )}
            <div className="relative min-w-64 flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder={`Tìm kiếm ${config.title.toLowerCase()}...`} className="pl-9" />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  Lọc
                </button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto px-4 py-4">
                <SheetHeader className="space-y-3">
                  <SheetTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filter {config.title}
                  </SheetTitle>
                  <SheetDescription>
                    Apply filters to refine your {config.title.toLowerCase()} view
                  </SheetDescription>
                </SheetHeader>

                <div className="cmms-filter-section">
                  <div className="cmms-filter-group">
                    <div className="cmms-filter-label">Status</div>
                    {["All", "Active", "Pending", "In Progress", "Completed"].map((status) => (
                      <button className="cmms-filter-option" type="button" key={status}>
                        <span>{status}</span>
                        {status === "All" && <Badge variant="secondary">Default</Badge>}
                      </button>
                    ))}
                  </div>

                  <div className="cmms-filter-group">
                    <div className="cmms-filter-label">Sort by Creation Date</div>
                    {["Newest first", "Oldest first", "Priority first"].map((sort) => (
                      <button className="cmms-filter-option" type="button" key={sort}>
                        <span>{sort}</span>
                      </button>
                    ))}
                  </div>

                  <div className="cmms-filter-group">
                    <div className="cmms-filter-label">Demo scope</div>
                    {["Enterprise A", "Building A", "Warehouse A"].map((scope) => (
                      <button className="cmms-filter-option" type="button" key={scope}>
                        <span>{scope}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardHeader>
        <CardContent>
          {hasKanban && viewType === "kanban" ? (
            <KanbanBoard title={`${config.title} Kanban`} cards={kanbanCards ?? []} onOpenDetail={onOpenDetail} />
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead>
                <tr className="border-b border-gray-100">
                  {config.columns.map((column) => (
                    <th key={column} className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      {column}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {config.rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-blue-600">{row.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{row.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.owner}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.location}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[row.status] ?? "default"}>{row.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.date}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-blue-700"
                          onClick={() => onOpenDetail?.(row.id)}
                          aria-label={`Xem ${row.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                          aria-label={`Quick review ${row.id}`}
                          onClick={() => setQuickReviewRow(row)}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {config.features.map((feature) => (
          <Card key={feature}>
            <CardContent className="p-4">
              <p className="text-sm font-medium text-gray-900">{feature}</p>
              <p className="mt-1 text-xs text-gray-500">Có sẵn trong demo với dữ liệu mẫu và thao tác minh họa.</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet open={Boolean(quickReviewRow)} onOpenChange={(open) => !open && setQuickReviewRow(null)}>
        <SheetContent side="left" className="w-[450px] sm:w-[600px] overflow-y-auto px-6">
          <SheetHeader className="pb-4 border-b -mx-6 px-6">
            <SheetTitle className="text-2xl">Quick Review</SheetTitle>
            <SheetDescription className="text-base">
              Overview of {config.title.toLowerCase()} information
            </SheetDescription>
          </SheetHeader>

          {quickReviewRow && (
            <div className="cmms-quick-review-body space-y-5">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 leading-tight">{quickReviewRow.name}</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{quickReviewRow.id}</Badge>
                  <Badge variant={statusVariant[quickReviewRow.status] ?? "default"}>
                    {quickReviewRow.status}
                  </Badge>
                </div>
              </div>

              <div className="cmms-review-card space-y-3">
                <DetailItem label="Owner" value={quickReviewRow.owner} />
                <DetailItem label="Location" value={quickReviewRow.location} />
                <DetailItem label="Updated" value={quickReviewRow.date} />
                <DetailItem label="Metric" value={quickReviewRow.metric} />
              </div>

              <div className="cmms-review-card">
                <DetailItem label="Description" value={quickReviewRow.note} />
              </div>

              <div className="flex gap-2">
                <button
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  type="button"
                  onClick={() => {
                    onOpenDetail?.(quickReviewRow.id);
                    setQuickReviewRow(null);
                  }}
                >
                  View Detail
                </button>
                <button className="inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" type="button">
                  Duplicate
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function ModuleDetailView({
  config,
  id,
  onBack,
}: {
  config: ModuleConfig;
  id: string;
  onBack: () => void;
}) {
  const row = config.rows.find((item) => item.id === id) ?? config.rows[0];

  return (
    <div className="space-y-6">
      <button className="cmms-back-button" onClick={onBack}>
        <ArrowLeft className="h-4 w-4" />
        Quay lại {config.title}
      </button>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{config.detailTitle ?? config.title}: {row.id}</h1>
          <p className="mt-1 text-sm text-gray-500">{row.name}</p>
        </div>
        <Badge variant={statusVariant[row.status] ?? "default"}>{row.status}</Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Thông tin chi tiết</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <DetailItem label="Mã" value={row.id} />
            <DetailItem label="Tên" value={row.name} />
            <DetailItem label="Phụ trách" value={row.owner} />
            <DetailItem label="Vị trí/Đơn vị" value={row.location} />
            <DetailItem label="Ngày cập nhật" value={row.date} />
            <DetailItem label="Chỉ số" value={row.metric} />
            <div className="md:col-span-2">
              <DetailItem label="Ghi chú" value={row.note} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Luồng xử lý</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Tạo mới", "Kiểm tra", "Phê duyệt", "Hoàn tất"].map((step, index) => (
              <div key={step} className="flex gap-3">
                <div className={`mt-1 h-3 w-3 rounded-full ${index < 3 ? "bg-blue-600" : "bg-gray-200"}`} />
                <div>
                  <p className="text-sm font-medium text-gray-800">{step}</p>
                  <p className="text-xs text-gray-500">Người dùng demo - {index + 1} giờ trước</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase text-gray-400">{label}</p>
      <p className="mt-1 text-sm text-gray-800">{value}</p>
    </div>
  );
}
