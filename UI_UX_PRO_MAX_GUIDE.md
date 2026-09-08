# Hướng Dẫn Sử Dụng Skill UI/UX Pro Max Trong Dự Án Portfolio

Tài liệu này hướng dẫn cách sử dụng và các câu lệnh tra cứu của skill **UI/UX Pro Max** (`ui-ux-pro-max`) đã được tích hợp cục bộ trong dự án của bạn.

> 🚀 **CẦN COPY PROMPT & CÂU LỆNH MẪU NGAY?**
> Hãy mở file [UI_UX_PROMPTS.md](file:///d:/workspace/portfolio_project/UI_UX_PROMPTS.md) để copy-paste các mẫu prompt chat AI và lệnh Terminal điền vào chỗ trống!

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

---

## 6. Mẫu Prompt Dùng Cho AI (Copy & Dán Ngay Vào Chat)

Khi bạn muốn AI (Antigravity) tự động thiết kế hoặc chỉnh sửa, chỉ cần **copy một trong các prompt dưới đây**, thay đổi phần trong ngoặc vuông `[...]` theo ý bạn rồi gửi:

### 🎯 Mẫu 1: Thiết kế trang mới hoặc làm mới giao diện
```text
Hãy sử dụng skill ui-ux-pro-max để thiết kế giao diện cho trang [ví dụ: /services hoặc /contact].
Yêu cầu:
- Phong cách: [ví dụ: Brutalism hiện đại, nền tối Dark Obsidian, viền mỏng sắc nét]
- Điểm nhấn: màu [ví dụ: Cam Neon #fe3c01]
- Stack: React + CSS
Hãy tự chạy lệnh search.py --design-system để lấy bảng màu, font chữ, layout và áp dụng code hoàn chỉnh cho tôi.
```

### 🎨 Mẫu 2: Tìm bảng màu và màu nhấn (Color Palette)
```text
Hãy dùng skill ui-ux-pro-max tra cứu bảng màu Dark Mode phù hợp cho [ví dụ: portfolio lập trình viên / trang kỹ thuật].
Yêu cầu:
- Tone nền: [ví dụ: Tối sâu obsidian #09090b]
- Màu nhấn (Accent): [ví dụ: Cam neon hoặc Xanh electric]
- Đảm bảo độ tương phản text WCAG AA >= 4.5:1.
Hãy xuất ra mã HEX và CSS variables để tôi dùng trong dự án.
```

### 🔤 Mẫu 3: Chọn cặp Font chữ (Typography Pairing)
```text
Hãy dùng skill ui-ux-pro-max tra cứu cho tôi 1 cặp Google Fonts hoàn hảo cho website phong cách [ví dụ: Technical Editorial / Brutalist Minimal]:
- 1 font Heading: [ví dụ: đậm, hình học, cá tính mạnh mẽ]
- 1 font Body: [ví dụ: rõ ràng, dễ đọc khi đọc bài viết dài]
Cho tôi kèm đường dẫn Google Fonts link và cấu hình CSS font-family.
```

### ✨ Mẫu 4: Thêm chuyển động / Micro-interactions
```text
Hãy dùng skill ui-ux-pro-max tra cứu các hiệu ứng chuyển động cho [ví dụ: card dự án khi hover / nút tương tác like / hiệu ứng cuộn trang].
Yêu cầu:
- Thời gian animation: 150ms - 300ms
- Easing mượt mà: cubic-bezier
- Tối ưu GPU (chỉ dùng transform và opacity, không gây layout shift).
Áp dụng trực tiếp vào component [ví dụ: FeaturedProjectsSection.jsx].
```

### 📱 Mẫu 5: Kiểm tra và tối ưu hiển thị Mobile (Audit Responsive)
```text
Hãy dùng skill ui-ux-pro-max đối chiếu trang [ví dụ: /work hoặc /blog] với bộ quy tắc UX Mobile:
- Kiểm tra kích thước nút bấm (touch targets >= 44x44px, gap >= 8px).
- Kiểm tra không bị tràn thanh cuộn ngang (overflow-x).
- Tối ưu font chữ và lề padding trên màn hình 375px - 390px.
Sau đó sửa code trực tiếp giúp tôi.
```

### 🛡️ Mẫu 6: Review toàn diện và sửa lỗi UX / Trợ năng
```text
Hãy dùng skill ui-ux-pro-max chạy Pre-Delivery Checklist để review trang [ví dụ: /work].
Kiểm tra:
1. Độ tương phản màu sắc
2. Phím tắt điều hướng (ESC, Tab focus)
3. Trạng thái hover, active, loading
4. Lỗi khóa cuộn trang (scroll lock isolation)
Cho tôi bản đánh giá ngắn và tự động sửa các lỗi tìm thấy.
```

---

## 7. Bộ Lệnh Terminal "Điền Vào Chỗ Trống" (Chạy Trong Terminal)

Bạn có thể mở Terminal (`Ctrl + ~`) và copy nguyên dòng lệnh, chỉ cần thay đổi từ khóa trong dấu ngoặc kép:

```bash
# 1. Tạo trọn bộ Design System cho sản phẩm mới:
python .agents/skills/ui-ux-pro-max/scripts/search.py "<loại_sản_phẩm> <phong_cách>" --design-system -p "<Tên_Dự_Án>"

# 2. Điều chỉnh 3 thanh trượt (Độ phá cách, Hoạt họa, Mật độ bố cục):
python .agents/skills/ui-ux-pro-max/scripts/search.py "<từ_khóa>" --design-system --variance <1-10> --motion <1-10> --density <1-10>

# 3. Tìm phong cách giao diện (Style):
python .agents/skills/ui-ux-pro-max/scripts/search.py "<từ_khóa_phong_cách>" --domain style

# 4. Tìm bảng màu chuẩn (Color):
python .agents/skills/ui-ux-pro-max/scripts/search.py "<từ_khóa_màu_sắc>" --domain color

# 5. Tìm font chữ (Typography):
python .agents/skills/ui-ux-pro-max/scripts/search.py "<gu_font_chữ>" --domain typography

# 6. Tìm quy tắc UX & Touch Target (UX):
python .agents/skills/ui-ux-pro-max/scripts/search.py "<vấn_đề_cần_tra_cứu>" --domain ux

# 7. Tìm code chuyển động cuộn / hover (GSAP):
python .agents/skills/ui-ux-pro-max/scripts/search.py "<loại_chuyển_động>" --domain gsap

# 8. Tra cứu tối ưu kỹ thuật React (Stack):
python .agents/skills/ui-ux-pro-max/scripts/search.py "<vấn_đề_react>" --stack react
```

