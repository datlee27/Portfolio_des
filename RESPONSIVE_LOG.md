# Nhật Ký Công Việc: Tối Ưu Responsive & Cấu Trúc Độc Lập Design 4

**Ngày thực hiện**: 04/09/2026  
**Nhánh Git**: `feature/design4-data-integration`  

---

## 🚀 Đã Đóng Gói Design 4 Thành Giao Diện Chính Của FE

1. **Xóa Các Folder Thiết Kế Cũ (`design1`, `design2`, `design3`)**:
   - Đã xóa sạch 3 thư mục `src/designs/design1`, `src/designs/design2`, `src/designs/design3` để dự án gọn gàng 100%, không bị rối hay chứa mã dư thừa.
   - Tạo bộ dữ liệu độc lập `src/designs/design4/data/labProjects.js` và `src/designs/design4/components/LabProjectModal.jsx` giúp Design 4 không phụ thuộc vào bất kỳ thư mục ngoài nào.

2. **Cập Nhật `src/App.jsx` Chạy Trực Tiếp Design 4**:
   - Cập nhật file chính `src/App.jsx` load thẳng `Design4App` làm giao diện ứng dụng mặc định của toàn bộ website.
   - Dung lượng build sản phẩm được tối ưu cực nhẹ từ 426 kB xuống chỉ còn **306 kB**!

---

## 🛠️ Đã Sửa Các Lỗi Giao Diện Theo Phản Hồi Ảnh Trực Quan

1. **Khôi Phục Hiển Thị 4 Góc Navigation (`CornerNav.jsx` & `design4.css`)**:
   - Khôi phục màu chữ chuẩn `#ffffff` kết hợp `mix-blend-mode: difference` và `z-index: 99999`.
   - Đảm bảo 4 nút điều hướng góc (**dl***, **work**, **about**, **lab**) hiển thị rõ nét 100%, tự động tương phản tự nhiên trên cả nền sáng (trắng) và nền tối (đen).

2. **Sửa Lỗi Thẻ 3D Dính & Chồng Cạnh Lên Nhau (`ClientsSection.jsx`)**:
   - Điều chỉnh lại bán kính xoay 3D Cylinder ($R > \frac{W}{0.7654}$):
     - Mobile (<600px): Thu nhỏ thẻ `cardWidth = 140px` và tăng bán kính `radius = 240px`.
     - Tablet (600px-900px): `cardWidth = 200px`, `radius = 320px`.
     - Desktop (>=900px): `cardWidth = 260px`, `radius = 420px`.
   - Giữa các thẻ 3D ("SMART RECYCLE BIN", "AI LMS", "FRUIT SHOP"...) giờ đây có khoảng hở sạch sẽ ~44px, xoay tròn 3D tách biệt hoàn toàn, không bị dính hay đè mép lên nhau.

3. **Fix Tiêu Đề Hero Vừa Màn Hình (Không Bị Nhỏ)**:
   - Tăng tỷ lệ co giãn chữ Kinetic Typography trên Mobile lên `clamp(44px, 11.5vw, 150px)`. Chữ trên màn hình iPhone vừa vặn, nổi bật.
   - Giảm `minHeight` từ `100vh` xuống `85vh` để xóa bỏ vùng trắng thừa.

4. **Rút Ngắn Khoảng Cách Giữa Các Section**:
   - Giảm padding của Intro, Showreel, Featured Work, What I Do, Clients và Footer xuống `30px - 60px`.

---

## 🌐 Kiểm Tra Build
- `npm run build` chạy thành công 100% (built in 498ms, 306 kB).
