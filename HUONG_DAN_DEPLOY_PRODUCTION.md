# 🚀 HƯỚNG DẪN TRIỂN KHAI PRODUCTION LÊN HOSTING (WORDPRESS / CPANEL)

> **Mục tiêu**: Hướng dẫn chi tiết từng bước đưa toàn bộ dự án Portfolio & Blog mới nhất (bao gồm cả **Frontend React SPA** và **Backend PHP / Swagger API**) lên hosting `https://datdoc.id.vn` để thay thế hoàn toàn phiên bản cũ, đảm bảo dữ liệu đồng bộ thời gian thực, không bị lỗi 404 khi F5 và không mất kết nối Database.

---

## 🏗️ 1. CẤU TRÚC THƯ MỤC TRÊN HOSTING (PUBLIC_HTML)

Trên hosting (cPanel / DirectAdmin / VPS Apache), toàn bộ hệ thống được bố trí chuẩn hóa như sau:

```text
public_html/                                  <── Thư mục gốc website (Frontend React SPA)
│
├── api/                                      <── Thư mục Backend RESTful API & Swagger
│   ├── .htaccess                             <── Cấu hình CORS & bảo mật API
│   ├── auth.php                              <── API xác thực Admin (login, check, logout)
│   ├── index.php                             <── Router & Controller chính (CRUD Projects, Personal, Skills, Experience, Posts)
│   ├── docs.php                              <── Giao diện Swagger UI tương tác (Dark theme)
│   ├── swagger.json                          <── Đặc tả OpenAPI 3.0.3 đầy đủ 100% endpoints
│   └── db.php (hoặc config.php nếu có)       <── Thông tin kết nối MySQL Database
│
├── .htaccess                                 <── Điều hướng React Router SPA (Tránh lỗi 404 khi F5)
├── index.html                                <── File index chính của Frontend mới (từ dist/)
├── assets/                                   <── Thư mục JS, CSS, Media đã build tối ưu (từ dist/assets/)
├── images/                                   <── Thư mục ảnh (clothesline, v.v.)
└── favicon.ico / site.webmanifest / ...      <── Tài nguyên tĩnh
```

---

## 📦 BƯỚC 1: CẬP NHẬT BACKEND API & MỞ RỘNG CSDL MYSQL

Thư mục [`backend/`](file:///Users/mac/Project/portfolio_desnew/Portfolio_des/backend) trong source code đã có sẵn đầy đủ 5 file tiêu chuẩn.

### 1.1. Upload các file Backend vào `public_html/api/`
1. Đăng nhập vào cPanel / DirectAdmin -> Mở **File Manager (Trình quản lý tệp)**.
2. Điều hướng vào thư mục **`public_html/api/`**.
3. Tải lên và ghi đè các file sau từ thư mục `backend/` của dự án:
   - `index.php`
   - `auth.php`
   - `docs.php`
   - `swagger.json`
   - `.htaccess`
4. **Lưu ý về Database**: 
   - Nếu hosting của bạn đã có file cấu hình kết nối DB riêng (như `db.php` hoặc `config.php`), giữ nguyên file đó.
   - Nếu chưa có, mở file `index.php` vừa upload và kiểm tra 4 dòng cấu hình DB (dòng 33–36):
     ```php
     $dbHost = 'localhost';
     $dbName = 'datdoc_portfolio'; // Thay bằng tên Database trên hosting của bạn
     $dbUser = 'datdoc_user';      // Thay bằng User Database
     $dbPass = 'mat_khau_cua_ban'; // Thay bằng Mật khẩu Database
     ```

### 1.2. Kích hoạt cập nhật cấu trúc bảng MySQL (Setup Script)
Sau khi upload xong, bạn chỉ cần mở trình duyệt và truy cập vào đường link:
👉 **`https://datdoc.id.vn/api/index.php?endpoint=setup-portfolio`**

Hệ thống sẽ tự động:
- Tạo bảng `posts` (nếu chưa có).
- Bổ sung các cột mới vào bảng `projects`: `is_public` (TINYINT), `body_images` (TEXT), `video_demo` (TEXT), `sort_order` (INT).
- Bổ sung cột `cv_url` vào bảng `personal`.
- Trả về thông báo JSON: `{"success": true, "message": "Portfolio database tables and sample data initialized successfully!"}`.

### 1.3. Kiểm tra Swagger Documentation
Truy cập:
👉 **`https://datdoc.id.vn/api/docs.php`**
Giao diện Swagger UI tương tác sẽ hiển thị toàn bộ 10 endpoints hoàn chỉnh để bạn test trực tiếp trên trình duyệt.

---

## 🎨 BƯỚC 2: BUILD & TRIỂN KHAI FRONTEND REACT (DIST)

### 2.1. Đóng gói Frontend tại máy tính (Local)
Mở Terminal tại thư mục dự án trên máy của bạn và chạy lệnh:
```bash
npm run build
```
*(Quá trình build chỉ mất khoảng 1 giây, xuất ra thư mục **`dist/`**).*

### 2.2. Nén thư mục `dist/` để upload
1. Đi vào **bên trong** thư mục `dist/` (lưu ý: chọn các file *bên trong* `dist/`, không nén cả folder cha `dist`):
   - Chọn `index.html`, thư mục `assets/`, `images/`, `favicon.ico`, v.v.
2. Nén thành file **`build.zip`**.

### 2.3. Sao lưu và dọn dẹp bản cũ trên Hosting
1. Mở cPanel **File Manager** -> vào thư mục gốc **`public_html/`**.
2. **Sao lưu (khuyên dùng)**: Chọn thư mục `assets/` cũ và file `index.html` cũ -> bấm **Compress** thành `backup_old_fe.zip` để dự phòng.
3. **Xóa bản cũ**: Xóa thư mục `assets/` cũ và file `index.html` cũ trong `public_html/`.  
   > ⚠️ **TUYỆT ĐỐI KHÔNG XÓA THƯ MỤC `public_html/api/`**!

### 2.4. Upload và giải nén bản mới
1. Bấm nút **Upload** trên thanh công cụ cPanel -> Tải file `build.zip` lên `public_html/`.
2. Chuột phải vào `build.zip` -> Chọn **Extract (Giải nén)** trực tiếp vào `public_html/`.
3. Kiểm tra cấu trúc: File `index.html` mới và thư mục `assets/` mới phải nằm ngay tại thư mục gốc `public_html/`.
4. Xóa file `build.zip` sau khi giải nén xong để giải phóng dung lượng.

---

## ⚙️ BƯỚC 3: CẤU HÌNH FILE `.HTACCESS` ĐIỀU HƯỚNG TẠI THƯ MỤC GỐC

Để React Router hoạt động mượt mà (người dùng truy cập trực tiếp hoặc bấm F5 ở `/work`, `/lab`, `/blog`, `/admin` không bị lỗi 404 của Apache/WordPress):

1. Trong thư mục **`public_html/`**, tạo (hoặc chỉnh sửa) file **`.htaccess`**.
2. Dán toàn bộ nội dung cấu hình chuẩn sau vào:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Bỏ qua và giữ nguyên toàn bộ request gọi vào Backend API (/api/...)
  RewriteRule ^api/ - [L]

  # 2. Nếu đường dẫn trỏ đúng vào file thật hoặc thư mục thật thì mở trực tiếp
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # 3. Mọi route ảo khác của React (/work, /lab, /blog, /admin,...) chuyển về index.html
  RewriteRule ^ index.html [L]
</IfModule>

# Bật nén Gzip tăng tốc độ tải trang
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Caching tài nguyên tĩnh trong assets/ để load nhanh tức thì
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```

3. Bấm **Save Changes (Lưu thay đổi)**.

---

## ✅ BƯỚC 4: CHECKLIST NGHIỆM THU SAU KHI DEPLOY

Sau khi hoàn tất, hãy mở tab ẩn danh trên trình duyệt và kiểm tra lần lượt:

| Hạng mục kiểm tra | Kết quả mong đợi |
| :--- | :--- |
| **Trang chủ (`/`) - Featured Work** | Chỉ hiển thị **đúng 4 dự án đầu tiên**, có nút *"Explore All Selected Works"* chuyển mượt sang `/work`. |
| **Trang chủ (`/`) - Visual Archive** | Chiều dài cuộn mở rộng **`250vh`**, ghim cố định 100vh toàn màn hình, các thẻ ảnh uốn cong tinh tế không bị méo, không còn chữ/vạch ở 2 góc dưới. |
| **Trang chủ (`/`) - Clothesline Gallery** | Ảnh số 2 hiển thị đúng ảnh **cửa sổ tàu hỏa `pin-13`** do bạn chụp (tiêu đề: *Kinetic Vista*). |
| **Trang dự án (`/work`)** | Hiển thị đầy đủ tất cả dự án, bộ lọc danh mục và trạng thái Public/Private hoạt động chuẩn. |
| **Phòng thí nghiệm (`/lab`)** | Finder và Terminal macOS đồng bộ dữ liệu động 100% với Portfolio, không hiển thị dự án bị ẩn. |
| **Trang quản trị (`/admin`)** | Đăng nhập mượt mà. Khi bạn cập nhật hoặc ẩn/hiện dự án, các tab đang mở ngoài portfolio **tự động cập nhật thời gian thực ngay lập tức mà không cần F5**. |
| **Trang lỗi (`/404`)** | Linh vật pixel ở giữa to đẹp (**165px**), tiêu đề `system glitch`, 2 nút pill button ở dưới, không còn câu chữ mô tả thừa. |
| **Tài liệu API (`/api/docs.php`)** | Swagger UI hiển thị đầy đủ 10 endpoint CRUD, sẵn sàng tương tác. |

---

🎉 **Chúc mừng! Toàn bộ dự án Portfolio & Blog đã sẵn sàng hoạt động với hiệu năng cao nhất trên production!**

