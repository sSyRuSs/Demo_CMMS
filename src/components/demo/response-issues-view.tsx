"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  FileIcon,
  Filter,
  Menu,
  MessageSquare,
  Paperclip,
  Plus,
  ReceiptPoundSterling,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";
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

type ResponseReport = {
  id: string;
  taskDetailCode: string;
  taskDetailProblem: string;
  taskDetailDescription: string;
  taskName: string;
  completed: boolean;
  important: boolean;
  createdAt: string;
  updatedAt: string;
  files: { id: string; name: string; size: string; type: string }[];
};

const reports: ResponseReport[] = [
  {
    id: "RSP-001",
    taskDetailCode: "TD-AC-104",
    taskDetailProblem: "Áp suất bơm thấp bất thường",
    taskDetailDescription:
      "Kỹ thuật viên ghi nhận áp suất đầu ra thấp hơn ngưỡng vận hành. Cần kiểm tra phớt, bạc đạn và đường ống hồi trước khi đóng task.",
    taskName: "Thay bạc đạn bơm A01",
    completed: false,
    important: true,
    createdAt: "2026-06-05T08:20:00",
    updatedAt: "2026-06-05T10:10:00",
    files: [
      { id: "F-001", name: "pump-pressure-photo.jpg", size: "2.4 MB", type: "Image" },
      { id: "F-002", name: "inspection-note.pdf", size: "640 KB", type: "PDF" },
    ],
  },
  {
    id: "RSP-002",
    taskDetailCode: "TD-HVAC-033",
    taskDetailProblem: "Lưới lọc AHU bám bụi dày",
    taskDetailDescription:
      "Sau khi mở nắp AHU, lưới lọc bẩn nặng và cần thay mới thay vì vệ sinh. Đề xuất tạo PR cho bộ lọc thay thế.",
    taskName: "Vệ sinh lưới lọc AHU",
    completed: false,
    important: false,
    createdAt: "2026-06-04T14:35:00",
    updatedAt: "2026-06-05T09:00:00",
    files: [{ id: "F-003", name: "ahu-filter-before.png", size: "1.1 MB", type: "Image" }],
  },
  {
    id: "RSP-003",
    taskDetailCode: "TD-LIFT-208",
    taskDetailProblem: "Nghiệm thu thang máy hoàn tất",
    taskDetailDescription:
      "Đã hoàn tất kiểm tra cabin, tải trọng, liên động cửa và biên bản nghiệm thu. Không phát hiện lỗi nghiêm trọng.",
    taskName: "Nghiệm thu thang máy",
    completed: true,
    important: false,
    createdAt: "2026-06-03T11:15:00",
    updatedAt: "2026-06-04T16:40:00",
    files: [{ id: "F-004", name: "lift-acceptance.xlsx", size: "88 KB", type: "Excel" }],
  },
  {
    id: "RSP-004",
    taskDetailCode: "TD-UPS-019",
    taskDetailProblem: "UPS battery fault cần vendor xác minh",
    taskDetailDescription:
      "UPS vẫn cảnh báo battery fault sau khi reset. Cần vendor kiểm tra battery pack và đề xuất thay thế.",
    taskName: "Kiểm tra UPS battery fault",
    completed: false,
    important: true,
    createdAt: "2026-06-02T17:50:00",
    updatedAt: "2026-06-03T08:05:00",
    files: [],
  },
];

export function ResponseIssuesView() {
  const [selectedReportId, setSelectedReportId] = useState(reports[0]?.id ?? null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = useMemo(
    () =>
      reports.filter(
        (report) =>
          report.taskDetailProblem.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.taskDetailDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.taskDetailCode.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  );

  const selectedReport = reports.find((report) => report.id === selectedReportId) ?? null;

  return (
    <div className="cmms-response-page">
      <div className="cmms-response-header">
        <div className="cmms-response-title-block">
          <div className="cmms-response-icon">
            <ReceiptPoundSterling className="h-6 w-6" />
          </div>
          <div>
            <h1>List Report</h1>
            <p>Manage and track all response issues efficiently</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto px-4 py-4">
              <SheetHeader className="space-y-3">
                <SheetTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter Reports
                </SheetTitle>
                <SheetDescription>Apply filters to refine your report list</SheetDescription>
              </SheetHeader>
              <div className="cmms-filter-section">
                <FilterOptionGroup title="Status" options={["All", "Open", "Resolved"]} />
                <FilterOptionGroup title="Priority" options={["All", "High", "Low"]} />
                <FilterOptionGroup title="Sort" options={["Newest first", "Oldest first"]} />
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Add New Response
              </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:w-[620px] overflow-y-auto px-4 py-4">
              <SheetHeader className="space-y-3">
                <SheetTitle>Create New Response</SheetTitle>
                <SheetDescription>Record a response issue with description, priority and attachments.</SheetDescription>
              </SheetHeader>
              <div className="cmms-response-form">
                <label>
                  <span>Title*</span>
                  <Input placeholder="Enter issue title" />
                </label>
                <label>
                  <span>Task Detail</span>
                  <select>
                    <option>TD-AC-104 - Pump pressure</option>
                    <option>TD-HVAC-033 - AHU filter</option>
                    <option>TD-UPS-019 - UPS fault</option>
                  </select>
                </label>
                <label>
                  <span>Description*</span>
                  <textarea placeholder="Describe the problem and response..." />
                </label>
                <div className="cmms-response-upload">
                  <FileIcon className="h-6 w-6" />
                  <span>Drop files here or click to upload</span>
                  <small>Images, PDF, Word, Excel up to 10 MB</small>
                </div>
                <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" type="button">
                  Create Response
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="cmms-report-card-shell">
        <ReportListPanel
          reports={filteredReports}
          selectedReportId={selectedReportId}
          onSelectReport={setSelectedReportId}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
        />
        <ReportDetailPanel report={selectedReport} />
      </div>
    </div>
  );
}

function ReportListPanel({
  reports,
  selectedReportId,
  onSelectReport,
  searchTerm,
  onSearchTermChange,
}: {
  reports: ResponseReport[];
  selectedReportId: string | null;
  onSelectReport: (reportId: string) => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
}) {
  return (
    <aside className="cmms-report-list-panel">
      <div className="cmms-report-list-header">
        <div className="font-medium text-lg">Reports</div>
        <Menu className="h-4 w-4 text-gray-400" />
      </div>
      <div className="cmms-report-search">
        <Search className="h-4 w-4" />
        <input
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
          placeholder="Search reports..."
        />
      </div>
      <div className="cmms-report-list">
        {reports.map((report) => (
          <button
            key={report.id}
            className={`cmms-report-item ${report.id === selectedReportId ? "cmms-report-item-selected" : ""}`}
            onClick={() => onSelectReport(report.id)}
            type="button"
          >
            <div className="cmms-report-item-copy">
              <p>{report.taskDetailCode}</p>
              <span>
                {report.taskDetailDescription.substring(0, 62)}... &middot; {formatShortDate(report.updatedAt)}
              </span>
            </div>
            <Badge variant={report.important ? "danger" : "secondary"}>
              {report.important ? "High" : "Low"}
            </Badge>
          </button>
        ))}
      </div>
    </aside>
  );
}

function ReportDetailPanel({ report }: { report: ResponseReport | null }) {
  if (!report) {
    return (
      <div className="cmms-report-empty">
        <AlertCircle className="h-12 w-12" />
        <p>Select a report to view details</p>
      </div>
    );
  }

  const status = report.completed ? "Resolved" : "Open";

  return (
    <section className="cmms-report-detail-panel">
      <div className="cmms-report-detail-header">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <div>
            <p>{report.taskDetailProblem}</p>
            <span>
              Reported by {report.taskDetailProblem} &middot; {formatLongDate(report.createdAt)}
            </span>
          </div>
        </div>
        <button className="cmms-report-delete" type="button">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="cmms-report-detail-scroll">
        <div className="cmms-report-details-card">
          <div className="cmms-report-details-card-header">
            <h2>Issue Details</h2>
            <Badge variant={status === "Open" ? "danger" : "success"}>
              {status === "Resolved" ? <CheckCircle className="h-4 w-4" /> : <X className="h-4 w-4" />}
              {status}
            </Badge>
          </div>

          <div className="cmms-report-meta-grid">
            <MetaItem icon={<User className="h-5 w-5" />} label="Task" value={report.taskName} />
            <MetaItem icon={<Calendar className="h-5 w-5" />} label="Date Reported" value={formatLongDate(report.createdAt)} />
          </div>

          <div className="cmms-report-description">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-gray-600" />
              <h3>Description</h3>
            </div>
            <p>{report.taskDetailDescription}</p>
          </div>

          {report.files.length > 0 && (
            <div className="cmms-report-attachments">
              <div className="flex items-center gap-2">
                <Paperclip className="h-5 w-5 text-gray-600" />
                <h3>Attachments</h3>
              </div>
              <div className="cmms-report-attachment-grid">
                {report.files.map((file) => (
                  <div className="cmms-report-attachment" key={file.id}>
                    <div>
                      <Paperclip className="h-4 w-4" />
                    </div>
                    <span>
                      <strong>{file.name}</strong>
                      <small>{file.type} &middot; {file.size}</small>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function MetaItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="cmms-report-meta-item">
      <div>{icon}</div>
      <span>
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
    </div>
  );
}

function FilterOptionGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <div className="cmms-filter-group">
      <div className="cmms-filter-label">{title}</div>
      {options.map((option) => (
        <button className="cmms-filter-option" type="button" key={option}>
          <span>{option}</span>
          {option === "All" && <Badge variant="secondary">Default</Badge>}
        </button>
      ))}
    </div>
  );
}

function formatShortDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatLongDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
