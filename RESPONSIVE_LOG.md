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

4. **Khôi Phục Hiệu Ứng Tự Động Đổi Màu Động Của Nút Điều Hướng Góc (`CornerNav.jsx` & `design4.css`)**:
   - Khôi phục cơ chế **`mix-blend-mode: difference`** với màu chữ mặc định `#ffffff` cho 4 nút điều hướng góc (**dl***, **work**, **blog**, **about**, **lab**).
   - Khi ở nền sáng (trắng), chữ tự động đảo ngược thành **màu đen**.
   - Khi cuộn xuống các section nền tối (đen/nền ảnh), chữ tự động đảo ngược thành **màu trắng**.
   - Khi lướt qua các mảng màu nổi (cam/xanh/hồng), chữ đảo ngược thành các dải màu tương phản cực nét chuẩn Brutalist.

5. **Tích Hợp Component Pet Interactive Chó Poodle Tiny Màu Đen Vào Phần Hero (`HeroSection.jsx` & `NekoCat.jsx`)**:
   - Chuyển đổi thành chú chó **Poodle Tiny màu đen** (`cat="Black"`, `size="1x"`) tương tác với chuyển động chuột và trạng thái nghỉ ngủ/chạy trốn/vẫy đuôi mượt mà trên tiêu đề Hero.
   - Cập nhật nút Toggle Pill thành `"You like poodles? 🐩"` ở góc màn hình cho phép bật/tắt chế độ cún đuổi theo con trỏ chuột (`followCursor`), tự động lưu lựa chọn vào `localStorage`.

---

## 🌐 Kiểm Tra Build
- `npm run build` đã chạy thành công 100% (built in 663ms, 321.42 kB).
