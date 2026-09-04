# Nhật Ký Công Việc: Tối Ưu Responsive & Cấu Trúc Độc Lập Design 4

**Ngày thực hiện**: 04/09/2026  
**Nhánh Git**: `feature/design4-data-integration`  

---

## 📝 Đã Thêm Trang / Section Bài Viết (Blog Section)

1. **Thêm `BlogSection.jsx` Với Dữ Liệu Thật Chi Tiết**:
   - Tích hợp 4 bài viết thực tế từ `portfolioData.blogPosts`:
     1. **The Art of Minimalist Web Design** (15/10/2025 • 5 min read)
     2. **My Journey Into Web Development** (28/09/2025 • 7 min read)
     3. **Building with React: Best Practices** (10/09/2025 • 8 min read)
     4. **Work-Life Balance as a Developer** (22/08/2025 • 6 min read)
   - Thiết kế chuẩn phong cách Brutalist của Design 4 với Marquee Header chữ cuộn mượt (`articles & thoughts *`), ảnh bìa thẻ bài viết, ngày đăng, thời lượng đọc và tóm tắt.

2. **Giao Diện Đọc Bài Viết Interactive (Article Reader Modal)**:
   - Khi bấm vào bất kỳ bài viết nào, một cửa sổ Modal Reader sẽ mở ra hiển thị trọn vẹn nội dung bài viết định dạng HTML sắc nét, có ảnh minh họa, tiêu đề và nút đóng ✕.

3. **Cập Nhật Nút Điều Hướng Góc (`CornerNav.jsx` & `Design4App.jsx`)**:
   - Thêm nút **blog** ở góc trên bên phải cạnh nút **work**, bấm vào tự động cuộn mượt xuống thẳng phần bài viết.

---

## 🚀 Đã Đóng Gói Design 4 Thành Giao Diện Chính Của FE

1. **Xóa Thanh Chuyển Tab Giữa Các Thiết Kế (`DesignSwitcher.jsx`)**:
   - Đã xóa hoàn toàn component `DesignSwitcher.jsx` khỏi mã nguồn.
   - Giao diện giờ đây là **Design 4 thuần khiết 100%**.

2. **Xóa Các Folder Thiết Kế Cũ (`design1`, `design2`, `design3`)**:
   - Đã xóa sạch 3 thư mục `src/designs/design1`, `src/designs/design2`, `src/designs/design3`.
   - Tạo bộ dữ liệu độc lập `src/designs/design4/data/labProjects.js` và `src/designs/design4/components/LabProjectModal.jsx`.

3. **Cập Nhật `src/App.jsx` Chạy Trực Tiếp Design 4**:
   - `src/App.jsx` load thẳng `Design4App` làm giao diện ứng dụng mặc định của toàn bộ website.

---

## 🛠️ Đã Sửa Các Lỗi Giao Diện Theo Phản Hồi Ảnh Trực Quan

1. **Tối Ưu Kích Thước Chữ Hero Trên Mobile/Tablet (`HeroSection.jsx` & `design4.css`)**:
   - Font size Hero linh hoạt dành riêng cho màn hình nhỏ: `@media (max-width: 640px) { fontSize: clamp(44px, 13.5vw, 76px) !important; }`.
   - Tiêu đề chữ kinetic ("the chaos, of DAT LE, making sh*t, real") hiển thị **to rõ, đậm nét, vừa vặn và nổi bật ngay chính giữa màn hình điện thoại**.

2. **Fix Nút Corner Nav Không Đè Lên Chữ Khi Cuộn Trang (`CornerNav.jsx` & `design4.css`)**:
   - 4 nút điều hướng góc (**dl***, **work**, **blog**, **about**, **lab**) được thiết kế thành **Floating Glass Pills** với nền mờ sắc nét (`background: rgba(0,0,0,0.88)`, `backdrop-filter: blur(8px)`).

3. **Sửa Lỗi Thẻ 3D Dính & Chồng Cạnh Lên Nhau (`ClientsSection.jsx`)**:
   - Bán kính xoay 3D Cylinder chuẩn toán học ($R > \frac{W}{0.7654}$):
     - Mobile (<600px): `cardWidth = 140px`, `radius = 240px`.
     - Tablet (600px-900px): `cardWidth = 200px`, `radius = 320px`.
     - Desktop (>=900px): `cardWidth = 260px`, `radius = 420px`.

---

## 🌐 Kiểm Tra Build
- `npm run build` đã chạy thành công 100% (built in 580ms, 311.1 kB).
