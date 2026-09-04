# Nhật Ký Công Việc: Tối Ưu Responsive Toàn Diện Design 4 (YanXin Zhang Style)

**Ngày thực hiện**: 04/09/2026  
**Nhánh Git**: `feature/design4-data-integration`  
**Mục tiêu**: Tối ưu giao diện Design 4 đảm bảo tương thích 100% trên mọi thiết bị: Mobile (iOS, Android portrait & landscape), Tablet, Laptop và Desktop (theo chuẩn thiết kế của [yanxinzhang.com](https://yanxinzhang.com/)).

---

## 1. Tóm Tắt Các Thay Đổi Theo Từng Component

### 🎨 Design System & CSS Token (`design4.css`)
- **Safe Area Insets**: Thêm hỗ trợ các biến `env(safe-area-inset-top)`, `env(safe-area-inset-bottom)` cho các thiết bị iPhone có tai thỏ / Dynamic Island và Android gesture bar.
- **Breakpoints chuẩn**:
  - `Mobile Portrait` (< 480px): Container padding `16px`.
  - `Mobile Landscape / Small Tablet` (< 768px): Container padding `20px`.
  - `Tablet / Laptop` (< 1024px): Container padding `28px`.
  - `Desktop`: Container padding `40px`, max-width `1200px`.
- **Chống Tràn Màn Hình**: Thêm `overflow-x: hidden` và class `.des4-hide-mobile` để tự ẩn/thu nhỏ các sticker nền không cần thiết trên màn hình nhỏ.

---

### 📍 Navigation 4 Góc (`CornerNav.jsx`)
- Thay thế vị trí cố định pixel bằng `clamp()` linh hoạt:
  - Top: `clamp(16px, 3vw, 32px)`, Left/Right: `clamp(16px, 3.5vw, 36px)`.
  - Font size co giãn từ `13px` (mobile) đến `18px/24px` (desktop).
- Đảm bảo 4 nút `dl*`, `work`, `about`, `lab` không bao giờ bị tràn hoặc đè lên nội dung trang trên màn hình nhỏ.

---

### ⚡ Hero Section (`HeroSection.jsx`)
- **Kinetic Typography Responsive**: Điều chỉnh kích thước chữ tiêu đề từ `fontSize: clamp(64px, ...)` thành `fontSize: clamp(32px, 8.5vw, 150px)` để chữ tự động co giãn từ màn hình iPhone 320px đến 1920px mà không bị tràn khung hay xuống dòng lệch.
- **Tối ưu Stickers**: Gắn class `.des4-hide-mobile` cho các sticker trang trí ngoài lề để tránh che mất chữ tiêu đề hoặc làm xuất hiện thanh cuộn ngang trên điện thoại.
- **Touch Target**: Nút `play reel` / `creative mode` được tối ưu min-height và khoảng cách lề.

---

### 🛠️ Featured Work (`FeaturedProjectsSection.jsx`)
- **Grid Layout Responsive**:
  - Trên Desktop: Layout 2 cột (`1.2fr 1fr`).
  - Trên Mobile & Tablet (< 810px): Tự động chuyển thành 1 cột dạng thẻ xếp chồng (`grid-template-columns: 1fr`).
- **Tương thích Cảm Ứng**: Nút **Live Demo ↗** và **GitHub Code ↗** được thiết lập `min-height: 44px` theo tiêu chuẩn WCAG AA cho thao tác chạm trên iOS / Android.

---

### 🎯 What I Do (`WhatIDoSection.jsx`)
- **Tối ưu Cấu trúc Grid**: Chuyển khung hiển thị 3D và các khối chuyên môn (Web & Fullstack, Data & API, AI & IoT) sang dạng dọc xếp chồng linh hoạt khi xem trên thiết bị nhỏ (< 810px).
- **Skill List**: Các kỹ năng hiển thị dưới dạng grid tự động điều chỉnh (`repeat(auto-fill, minmax(180px, 1fr))`).

---

### 🌐 Clients 3D Cylinder Stage (`ClientsSection.jsx`)
- **Bán Kính 3D Tự Động Co Giãn**:
  - Mobile (< 600px): `cardWidth = 180px`, `cardHeight = 120px`, `radius = 210px`.
  - Tablet (600px - 900px): `cardWidth = 220px`, `cardHeight = 145px`, `radius = 300px`.
  - Desktop (>= 900px): `cardWidth = 280px`, `cardHeight = 180px`, `radius = 400px`.
- **Hỗ trợ Thao tác Cảm Ứng**: Thêm sự kiện `onTouchStart`, `onTouchMove`, `onTouchEnd` giúp vuốt xoay đĩa 3D mượt mà trên iPhone & Android.

---

### 📩 Footer & Contact (`FooterSection.jsx`)
- **Tiêu đề & Emblem**: Co giãn Logo `DL* /26` responsive (`clamp(80px, 22vw, 320px)`).
- **Social Buttons Row**: Các nút liên hệ **EMAIL ME**, **GITHUB**, **FACEBOOK** tự động xuống dòng và tối ưu min-height 44px.

---

## 2. Kiểm Trả & Xắc Nhận (Verification Results)

- **Production Build**: Command `npm run build` đã chạy thành công 100% không phát sinh lỗi.
- **Kích thước màn hình đã test**:
  1. iPhone 14 Pro / iOS (390 x 844 px) — Rất mượt, không có cuộn ngang.
  2. Android Phone (360 x 800 px) — Giao diện hiển thị chuẩn.
  3. iPad / Tablet (768 x 1024 px) — Chuyển đổi cột linh hoạt.
  4. Laptop (1440 x 900 px) & Desktop (1920 x 1080 px) — Đẹp mắt, tương tác 3D mượt mà.
