# CMMS Demo

Demo hệ thống quản lý bảo trì và vận hành thiết bị (CMMS) - Phiên bản giới thiệu không cần backend.

## Tính năng

- Dashboard với KPI tổng quan
- Nhóm General: Dashboard, Issues, Response Issues, Planner
- Nhóm Work Orders: Work Requests, Work Orders, Tasks, Your Tasks
- Nhóm Assets: Assets, Facilities, Enterprises
- Nhóm Inventory: Inventory, Inventory Categories, Vendors, Warehouse, Stock Movement, Stock Statistics, Purchase Requests
- Nhóm Users management: Users, Roles
- Nhóm Communication/Other: Video Call, Settings, Backup & Restore, Profiles
- Dữ liệu mẫu nằm sẵn trong frontend, không cần backend/API
- UI dựng bằng Next.js + Tailwind CSS + shadcn-style components

## Chạy local

```bash
npm install
npm run dev
```

Mở http://localhost:3001

## Build static

```bash
npm run build
```

Next.js được cấu hình `output: "export"`, kết quả nằm trong thư mục `out`.

## Deploy

Workflow `.github/workflows/deploy.yml` sẽ build và upload thư mục `out` lên GitHub Pages khi push lên branch `main` hoặc `master`.

## Tech

- Next.js 15
- Tailwind CSS 4
- Shadcn UI
- Recharts
