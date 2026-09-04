# Nhật Ký Công Việc: Tối Ưu Responsive & Cấu Trúc Độc Lập Design 4

**Ngày thực hiện**: 04/09/2026  
**Nhánh Git**: `feature/design4-data-integration`  

---

## 🚀 Đã Đóng Gói Design 4 Thành Giao Diện Chính Của FE

1. **Xóa Thanh Chuyển Tab Giữa Các Thiết Kế (`DesignSwitcher.jsx`)**:
   - Đã xóa hoàn toàn component `DesignSwitcher.jsx` khỏi mã nguồn.
   - Giao diện giờ đây là **Design 4 nguyên bản thuần khiết**, không còn bất kỳ thanh chọn tab chuyển đổi giữa các thiết kế 1, 2, 3 làm vướng víu tầm mắt hay đè lên các nút điều hướng nữa.

2. **Xóa Các Folder Thiết Kế Cũ (`design1`, `design2`, `design3`)**:
   - Đã xóa sạch 3 thư mục `src/designs/design1`, `src/designs/design2`, `src/designs/design3`.
   - Tạo bộ dữ liệu độc lập `src/designs/design4/data/labProjects.js` và `src/designs/design4/components/LabProjectModal.jsx` giúp Design 4 không phụ thuộc vào bất kỳ thư mục ngoài nào.

3. **Cập Nhật `src/App.jsx` Chạy Trực Tiếp Design 4**:
   - `src/App.jsx` load thẳng `Design4App` làm giao diện ứng dụng mặc định của toàn bộ website.
   - Dung lượng build sản phẩm được tối ưu cực nhẹ từ 426 kB giảm xuống chỉ còn **305 kB**!

---

## 🛠️ Đã Sửa Các Lỗi Giao Diện Theo Phản Hồi Ảnh Trực Quan

1. **Tối Ưu Kích Thước Chữ Hero Trên Mobile/Tablet (`HeroSection.jsx` & `design4.css`)**:
   - Thiết lập font size Hero linh hoạt dành riêng cho màn hình nhỏ: `@media (max-width: 640px) { fontSize: clamp(44px, 13.5vw, 76px) !important; }`.
   - Giảm khung cao Hero tối ưu (`min-height: 70vh !important`), giúp cụm tiêu đề kinetic ("the chaos, of DAT LE, making sh*t, real") hiển thị **to rõ, đậm nét, vừa vặn và nổi bật ngay chính giữa màn hình điện thoại**, không bị thu nhỏ lỏm chôm hay tạo khoảng trắng thừa mênh mông nữa.

2. **Fix Nút Corner Nav Không Đè Lên Chữ Khi Cuộn Trang (`CornerNav.jsx` & `design4.css`)**:
   - Trên mobile (<640px), 4 nút điều hướng góc (**dl***, **work**, **about**, **lab**) được thiết kế thành **Floating Glass Pills** với nền mờ sắc nét (`background: rgba(0,0,0,0.88)`, `backdrop-filter: blur(8px)`).
   - **Kết quả**: Khi cuộn trang qua các đoạn văn bản (như đoạn *Dat Le is a multidisciplinary developer...*), các nút góc vẫn hiển thị nổi bật, dễ bấm, mà **hoàn toàn không bị đè lên chữ** hay gây rối mắt.

3. **Sửa Lỗi Thẻ 3D Dính & Chồng Cạnh Lên Nhau (`ClientsSection.jsx`)**:
   - Bán kính xoay 3D Cylinder chuẩn toán học ($R > \frac{W}{0.7654}$):
     - Mobile (<600px): `cardWidth = 140px`, `radius = 240px`.
     - Tablet (600px-900px): `cardWidth = 200px`, `radius = 320px`.
     - Desktop (>=900px): `cardWidth = 260px`, `radius = 420px`.
   - Khoảng hở giữa các thẻ 3D sạch sẻ ~44px, xoay mượt mà, không bị dính cạnh.

---

## 🌐 Kiểm Tra Build
- `npm run build` đã chạy thành công 100% (built in 472ms, 305.9 kB).
