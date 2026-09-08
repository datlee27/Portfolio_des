# 📋 UI/UX PRO MAX - BỘ PROMPT & CÂU LỆNH MẪU (COPY-PASTE)

> **Mẹo dùng nhanh**: 
> 1. Chọn mẫu prompt bạn cần.
> 2. Copy toàn bộ nội dung trong khung code.
> 3. Thay đổi nội dung trong ngoặc vuông `[...]` theo ý muốn.
> 4. Dán trực tiếp vào khung chat với AI (Antigravity) hoặc Terminal!

---

## 📑 MỤC LỤC
1. [Bộ Prompt Chat Với AI (Chỉ cần copy & gửi)](#1-bộ-prompt-chat-với-ai)
   - [Mẫu 1: Thiết kế Trang / Section Mới](#mẫu-1-thiết-kế-trang--section-mới)
   - [Mẫu 2: Phối Bảng Màu & Xuất CSS Variables](#mẫu-2-phối-bảng-màu--xuất-css-variables)
   - [Mẫu 3: Chọn Cặp Font Chữ (Google Fonts)](#mẫu-3-chọn-cặp-font-chữ-google-fonts)
   - [Mẫu 4: Thêm Hiệu Ứng Micro-Interactions / Hover](#mẫu-4-thêm-hiệu-ứng-micro-interactions--hover)
   - [Mẫu 5: Audit & Tối Ưu Hiển Thị Mobile Responsive](#mẫu-5-audit--tối-ưu-hiển-thị-mobile-responsive)
   - [Mẫu 6: Hiệu Ứng Chuyển Động GSAP Nâng Cao](#mẫu-6-hiệu-ứng-chuyển-động-gsap-nâng-cao)
   - [Mẫu 7: Review Toàn Diện & Sửa Lỗi UX / Overflow](#mẫu-7-review-toàn-diện--sửa-lỗi-ux--overflow)
   - [Mẫu 8: Tối Ưu Hiệu Năng Component React](#mẫu-8-tối-ưu-hiệu-năng-component-react)
2. [Bộ Lệnh Terminal Chạy Trực Tiếp (CLI)](#2-bộ-lệnh-terminal-chạy-trực-tiếp-cli)
3. [Từ Khóa Gợi Ý Điền Nhanh](#3-từ-khóa-gợi-ý-điền-nhanh)

---

## 1. BỘ PROMPT CHAT VỚI AI

### Mẫu 1: Thiết kế Trang / Section Mới
```text
Hãy sử dụng skill ui-ux-pro-max để thiết kế giao diện cho: [ví dụ: Section Dịch Vụ / Trang Chi Tiết Dự Án / Trang Giới Thiệu].
Yêu cầu:
- Phong cách: [ví dụ: Brutalism hiện đại, nền tối obsidian, viền mỏng sắc nét]
- Điểm nhấn: màu [ví dụ: Cam Neon #fe3c01]
- Stack: React + TailwindCSS hoặc Vanilla CSS
Hãy tự chạy lệnh search.py --design-system để lấy bảng màu, typography, layout và áp dụng code hoàn chỉnh cho tôi.
```

---

### Mẫu 2: Phối Bảng Màu & Xuất CSS Variables
```text
Hãy dùng skill ui-ux-pro-max tra cứu bảng màu [ví dụ: Dark Mode cho portfolio lập trình viên cao cấp].
Yêu cầu:
- Nền chính: [ví dụ: Tối sâu #09090b]
- Nền card/bento: [ví dụ: #141416]
- Màu nhấn (Accent): [ví dụ: Cam neon #fe3c01]
- Đảm bảo độ tương phản text WCAG AA >= 4.5:1.
Hãy xuất ra danh sách mã HEX và mã CSS Variables (:root) để tôi dán vào file CSS.
```

---

### Mẫu 3: Chọn Cặp Font Chữ (Google Fonts)
```text
Hãy dùng skill ui-ux-pro-max gợi ý cho tôi 1 cặp Google Fonts hoàn hảo theo phong cách [ví dụ: Creative Developer / Cyberpunk Minimal]:
- 1 font Heading: [ví dụ: Đậm, hình học, cá tính mạnh]
- 1 font Body: [ví dụ: Tinh gọn, cực kỳ dễ đọc khi xem bài viết dài]
Cung cấp cho tôi thẻ link import Google Fonts và cấu hình CSS font-family sẵn sàng sử dụng.
```

---

### Mẫu 4: Thêm Hiệu Ứng Micro-Interactions / Hover
```text
Hãy dùng skill ui-ux-pro-max thiết kế hiệu ứng micro-interaction cho [ví dụ: Card dự án khi hover / Nút CTA / Tag kỹ năng].
Yêu cầu:
- Thời gian animation: [ví dụ: 200ms - 300ms]
- Đường cong chuyển động: cubic-bezier(0.16, 1, 0.3, 1)
- Tối ưu GPU (chỉ dùng transform, opacity; không gây giật lag hoặc layout shift).
Áp dụng trực tiếp vào component [ví dụ: FeaturedProjectsSection.jsx].
```

---

### Mẫu 5: Audit & Tối Ưu Hiển Thị Mobile Responsive
```text
Hãy dùng skill ui-ux-pro-max đối chiếu trang [ví dụ: / hoặc /blog hoặc /work] với bộ tiêu chuẩn UX Mobile:
1. Kiểm tra kích thước mọi nút bấm và icon tương tác (touch target >= 44x44px, khoảng cách gap >= 8px).
2. Xóa bỏ hoàn toàn tình trạng tràn lề ngang (horizontal overflow-x).
3. Cân đối padding và font-size trên màn hình từ 375px đến 420px.
Tự động cập nhật code để tối ưu trải nghiệm trên điện thoại giúp tôi.
```

---

### Mẫu 6: Hiệu Ứng Chuyển Động GSAP Nâng Cao
```text
Hãy dùng skill ui-ux-pro-max tra cứu preset GSAP phù hợp cho [ví dụ: Hiệu ứng cuộn Parallax / Card bay vào theo dạng Stagger / Hiệu ứng nam châm Magnetic Button khi rê chuột].
Yêu cầu:
- Viết code bằng GSAP ScrollTrigger trong React (dùng useGSAP hoặc useEffect có cleanup).
- Đảm bảo hiệu ứng mượt 60fps và tự ngắt trên thiết bị yếu nếu cần.
Áp dụng vào component [ví dụ: Spiral3DSlider.jsx hoặc ProjectsSection.jsx].
```

---

### Mẫu 7: Review Toàn Diện & Sửa Lỗi UX / Overflow
```text
Hãy dùng skill ui-ux-pro-max chạy Pre-Delivery Checklist để review và sửa lỗi cho trang [ví dụ: /work]:
1. Kiểm tra độ tương phản màu sắc chữ trên nền.
2. Kiểm tra phím bấm điều hướng (ESC đóng popup, Tab điều hướng focus rõ ràng).
3. Kiểm tra các trạng thái tương tác: default, hover, active, disabled.
4. Kiểm tra lỗi khóa cuộn nền (chỉ khóa cuộn khi Modal đang mở, tự phục hồi cuộn khi đóng).
Báo cáo tóm tắt các điểm đã sửa và cập nhật code trực tiếp.
```

---

### Mẫu 8: Tối Ưu Hiệu Năng Component React
```text
Hãy dùng skill ui-ux-pro-max và kiến thức React Stack để tối ưu component [ví dụ: BlogPage.jsx]:
- Giảm số lần re-render thừa bằng React.memo, useMemo hoặc useCallback.
- Lazy load các hình ảnh hoặc nội dung nặng bên dưới màn hình (below-the-fold).
- Đảm bảo animation chạy mượt không bị tụt FPS khi cuộn danh sách dài.
```

---

## 2. BỘ LỆNH TERMINAL CHẠY TRỰC TIẾP (CLI)

Mở Terminal trong dự án (`Ctrl + ~`) và chạy các lệnh dưới đây. Bạn chỉ cần đổi từ khóa bên trong dấu ngoặc kép:

### 1. Tạo trọn bộ Design System cho sản phẩm mới:
```bash
python .agents/skills/ui-ux-pro-max/scripts/search.py "developer portfolio brutalism dark" --design-system -p "DatLe Portfolio"
```

### 2. Tinh chỉnh 3 thanh trượt (Độ phá cách, Hoạt họa, Mật độ bố cục):
```bash
# --variance: 1 (truyền thống) -> 10 (phá cách, sáng tạo)
# --motion: 1 (tĩnh lặng) -> 10 (chuyển động dồn dập)
# --density: 1 (thoáng đãng rộng rãi) -> 10 (dày đặc thông tin)
python .agents/skills/ui-ux-pro-max/scripts/search.py "creative portfolio" --design-system --variance 8 --motion 7 --density 5
```

### 3. Tìm phong cách thiết kế (Style):
```bash
python .agents/skills/ui-ux-pro-max/scripts/search.py "brutalism" --domain style
python .agents/skills/ui-ux-pro-max/scripts/search.py "minimalist dark" --domain style
python .agents/skills/ui-ux-pro-max/scripts/search.py "glassmorphism" --domain style
```

### 4. Tìm bảng màu chuẩn (Color):
```bash
python .agents/skills/ui-ux-pro-max/scripts/search.py "cyberpunk orange dark" --domain color
python .agents/skills/ui-ux-pro-max/scripts/search.py "fintech sleek blue" --domain color
python .agents/skills/ui-ux-pro-max/scripts/search.py "luxury obsidian gold" --domain color
```

### 5. Tìm font chữ (Typography):
```bash
python .agents/skills/ui-ux-pro-max/scripts/search.py "editorial technical" --domain typography
python .agents/skills/ui-ux-pro-max/scripts/search.py "modern clean sans" --domain typography
```

### 6. Tìm quy chuẩn trải nghiệm người dùng (UX Guidelines):
```bash
python .agents/skills/ui-ux-pro-max/scripts/search.py "touch target mobile button" --domain ux
python .agents/skills/ui-ux-pro-max/scripts/search.py "modal dialog keyboard escape" --domain ux
python .agents/skills/ui-ux-pro-max/scripts/search.py "form validation error state" --domain ux
```

### 7. Tìm chuyển động GSAP (GSAP Presets):
```bash
python .agents/skills/ui-ux-pro-max/scripts/search.py "scroll parallax" --domain gsap
python .agents/skills/ui-ux-pro-max/scripts/search.py "hover card 3d" --domain gsap
python .agents/skills/ui-ux-pro-max/scripts/search.py "text reveal stagger" --domain gsap
```

### 8. Tìm phương pháp tối ưu React (Stack):
```bash
python .agents/skills/ui-ux-pro-max/scripts/search.py "performance scroll animation" --stack react
python .agents/skills/ui-ux-pro-max/scripts/search.py "modal portal keyboard accessibility" --stack react
```

---

## 3. TỪ KHÓA GỢI Ý ĐIỀN NHANH

| Hạng mục | Từ khóa gợi ý (Copy điền vào dấu `[...]`) |
| :--- | :--- |
| **Phong cách (Styles)** | `brutalism`, `editorial`, `cyberpunk`, `minimalist dark`, `glassmorphism`, `retro-futuristic`, `bento-grid`, `swiss-style` |
| **Màu sắc (Colors)** | `neon orange (#fe3c01)`, `obsidian dark (#09090b)`, `electric cyan`, `matrix green`, `deep violet`, `slate monochrome` |
| **Font chữ (Fonts)** | `Space Grotesk + Inter`, `Syne + Plus Jakarta Sans`, `Cabinet Grotesk + Satoshi`, `JetBrains Mono + Manrope` |
| **Chuyển động (Motion)** | `stagger fade-up`, `magnetic button`, `smooth parallax`, `spring pop-in`, `cursor glow follower`, `noise overlay flicker` |
| **Thiết bị (Responsive)** | `Mobile iPhone SE (375px)`, `Mobile iPhone 15 (393px)`, `Tablet iPad (768px)`, `Desktop FHD (1440px)` |
