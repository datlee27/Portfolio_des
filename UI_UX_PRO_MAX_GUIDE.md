# Hướng Dẫn Sử Dụng Skill UI/UX Pro Max Trong Dự Án Portfolio

Tài liệu này hướng dẫn cách sử dụng và các câu lệnh tra cứu của skill **UI/UX Pro Max** (`ui-ux-pro-max`) đã được tích hợp cục bộ trong dự án của bạn.

---

## 1. Thông Tin Skill & Vị Trí Cài Đặt

- **Tên Skill**: `ui-ux-pro-max`
- **Mục đích**: Hệ thống trí tuệ thiết kế giao diện UI/UX toàn diện dành cho Web, Mobile và Desktop.
- **Cơ sở dữ liệu cục bộ**:
  - **79 phong cách thiết kế** (styles)
  - **192 bảng màu sản phẩm & reasoning profile** (colors)
  - **74 bộ ghép phông chữ chuẩn tỉ lệ** (typography)
  - **119 quy tắc UX & Accessibility chuẩn WCAG** (guidelines)
  - **105 bộ icon tuyển chọn** (icons)
  - **17 preset chuyển động GSAP** (motion/animation)
  - **22 technology stacks** (React, Tailwind, Next.js, v.v.)
- **Đường dẫn thư mục skill trong dự án**:
  `d:\workspace\portfolio_project\.agents\skills\ui-ux-pro-max`
- **Tệp script tìm kiếm chính**:
  `.agents/skills/ui-ux-pro-max/scripts/search.py`

---

## 2. Cấu Trúc Lệnh Cơ Bản

Tất cả các lệnh đều được chạy từ thư mục gốc của dự án (`d:\workspace\portfolio_project`) bằng **Python 3**:

```bash
python .agents/skills/ui-ux-pro-max/scripts/search.py "<từ khóa tìm kiếm>" [tùy chọn]
```

---

## 3. Các Lệnh Thường Dùng Nhất

### A. Tạo Toàn Bộ Hệ Thống Design System (`--design-system` / `-ds`)
Tự động tổng hợp phong cách, bảng màu, typography, khoảng cách, và checklist xuất ra định dạng trực quan:

```bash
# Tạo Design System chuẩn cho Portfolio Developer phong cách Brutalism Minimal
python .agents/skills/ui-ux-pro-max/scripts/search.py "portfolio developer brutalism minimal" --design-system -p "Dat Le Portfolio"
```

#### Tinh Chỉnh Với 3 Thanh Trượt Thẩm Mỹ (Dials 1–10):
- `--variance <1-10>`: Mức độ phá cách (1 = cân đối/tối giản, 10 = bất đối xứng/brutalist)
- `--motion <1-10>`: Mức độ hoạt họa (1 = nhẹ nhàng tinh tế, 10 = phức tạp/staggering)
- `--density <1-10>`: Mật độ bố cục (1 = thoáng đãng rộng rãi, 10 = cô đọng kiểu dashboard)

```bash
# Ví dụ: Độ phá cách 8, chuyển động 7, mật độ 6
python .agents/skills/ui-ux-pro-max/scripts/search.py "creative developer portfolio" --design-system --variance 8 --motion 7 --density 6 -p "Dat Le Portfolio"
```

---

### B. Tra Cứu Theo Từng Lĩnh Vực Cụ Thể (`--domain` / `-d`)

| Lĩnh vực | Domain | Mục đích | Lệnh mẫu |
|---|---|---|---|
| **Phong cách** | `style` | Khám phá các xu hướng (Brutalism, Glassmorphism, Neumorphism, HUD...) | `python .agents/skills/ui-ux-pro-max/scripts/search.py "brutalism modern dark" --domain style` |
| **Bảng màu** | `color` | Tìm bảng màu hài hòa, độ tương phản cao, màu nhấn (accent) | `python .agents/skills/ui-ux-pro-max/scripts/search.py "developer portfolio neon accent" --domain color` |
| **Typography** | `typography` | Các cặp font chữ phối hợp hoàn hảo (Heading + Body) | `python .agents/skills/ui-ux-pro-max/scripts/search.py "editorial technical modern" --domain typography` |
| **Quy tắc UX** | `ux` | Hướng dẫn Accessibility, kích thước nút bấm, phím tắt | `python .agents/skills/ui-ux-pro-max/scripts/search.py "touch target focus ring" --domain ux` |
| **Hoạt ảnh** | `gsap` | Mã mẫu chuyển động cuộn trang (ScrollTrigger, Parallax) | `python .agents/skills/ui-ux-pro-max/scripts/search.py "scroll trigger stagger reveal" --domain gsap` |
| **Biểu đồ** | `chart` | Tư vấn loại biểu đồ phù hợp cho dữ liệu kỹ thuật | `python .agents/skills/ui-ux-pro-max/scripts/search.py "real-time metrics performance" --domain chart` |
| **Icons** | `icons` | Lựa chọn icon phù hợp ngữ cảnh, quy tắc trợ năng | `python .agents/skills/ui-ux-pro-max/scripts/search.py "social media external link" --domain icons` |

---

### C. Tra Cứu Theo Công Nghệ Dự Án (`--stack` / `-s`)

Dự án này sử dụng **React**, bạn có thể tra cứu các best-practices chuyên biệt cho React:

```bash
# Tối ưu re-render và hiệu năng danh sách trong React
python .agents/skills/ui-ux-pro-max/scripts/search.py "rerender memo performance" --stack react

# Tối ưu modal và quản lý trạng thái cuộn
python .agents/skills/ui-ux-pro-max/scripts/search.py "modal portal escape key" --stack react
```

---

## 4. Bảng Tra Cứu Nhanh Các Lệnh Mẫu Thực Tế

```bash
# 1. Tra cứu phối màu tối (Dark Mode) cho trang công nghệ
python .agents/skills/ui-ux-pro-max/scripts/search.py "dark obsidian neon orange" --domain color

# 2. Tra cứu phông chữ cho trang cá nhân Tech Creator
python .agents/skills/ui-ux-pro-max/scripts/search.py "sans serif geometric modern" --domain typography

# 3. Tra cứu quy tắc kích thước nút chạm cảm ứng trên Mobile
python .agents/skills/ui-ux-pro-max/scripts/search.py "mobile touch friendly" --domain ux

# 4. Tra cứu quy tắc tương phản màu chữ (Contrast Ratio >= 4.5:1)
python .agents/skills/ui-ux-pro-max/scripts/search.py "text contrast ratio" --domain ux

# 5. Tra cứu hiệu ứng chuyển động vi mô (Micro-interactions)
python .agents/skills/ui-ux-pro-max/scripts/search.py "hover transition microinteraction" --domain gsap

# 6. Xem hướng dẫn dạng JSON (để truyền vào script xử lý tự động)
python .agents/skills/ui-ux-pro-max/scripts/search.py "brutalism" --domain style --json
```

---

## 5. Checklist Kiểm Tra Giao Diện Trước Khi Bàn Giao (Pre-Delivery Checklist)

Mỗi khi tạo mới một trang hoặc một component trong dự án, đối chiếu nhanh qua bảng checklist này:

- [ ] **Accessibility (Trợ năng)**:
  - Tỷ lệ tương phản chữ đạt tối thiểu `4.5:1` (chữ lớn đạt `3:1`).
  - Mọi nút bấm icon đơn lẻ đều có thuộc tính `title` hoặc `aria-label`.
  - Hỗ trợ phím tắt điều hướng (ví dụ: nhấn `ESC` để đóng popup).
- [ ] **Touch & Interaction (Cảm ứng & Tương tác)**:
  - Vùng bấm các nút tương tác tối thiểu `44×44px` trên màn hình điện thoại.
  - Khoảng cách giữa các nút liền kề tối thiểu `8px` (`gap >= 8px`).
  - Có con trỏ `cursor: pointer` trên tất cả phần tử có thể click.
- [ ] **Chuyển động (Animation)**:
  - Thời gian chuyển cảnh nhẹ nhàng `150ms – 300ms`.
  - Chỉ animate `transform` và `opacity` (tối ưu phần cứng GPU, tránh giật lag layout).
  - Tôn trọng thuộc tính `prefers-reduced-motion`.
- [ ] **Responsive (Thích ứng đa màn hình)**:
  - Kiểm tra hoàn hảo ở các kích thước: `375px` (Mobile), `768px` (Tablet), `1024px` (Laptop), `1440px` (Desktop).
  - Không xuất hiện thanh cuộn ngang ngoài ý muốn (`no horizontal scroll`).
