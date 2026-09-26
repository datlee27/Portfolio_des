# 🚀 HƯỚNG DẪN CHI TIẾT THAY THẾ & TRIỂN KHAI FRONTEND LÊN DOMAIN (DATDOC.ID.VN)

> **Mục tiêu**: Hướng dẫn từng bước thay thế giao diện Frontend (FE) cũ trên hosting của domain `https://datdoc.id.vn` bằng bản Frontend React mới của dự án này, trong khi vẫn **giữ nguyên 100% Backend API (PHP) và Cơ sở dữ liệu (MySQL)** đang chạy.

---

## 📌 1. TỔNG QUAN KIẾN TRÚC HỆ THỐNG TRÊN HOSTING

Trên hosting của domain `datdoc.id.vn` (thường là thư mục `public_html` trong cPanel / DirectAdmin hoặc VPS), cấu trúc thư mục được phân chia như sau:

```text
public_html/ (Thư mục gốc web)
│
├── api/                    <── [CỰC KỲ QUAN TRỌNG: GIỮ NGUYÊN TUYỆT ĐỐI]
│   ├── auth.php            <── API xác thực đăng nhập Admin
│   ├── index.php           <── API CRUD dự án, bài viết blog, kỹ năng
│   ├── docs.php            <── Swagger UI API Documentation
│   └── ...                 <── Các script kết nối MySQL
│
├── .htaccess               <── File cấu hình điều hướng URL cho React SPA
│
├── index.html              <── [THAY MỚI]: File HTML chính của FE mới
├── assets/                 <── [THAY MỚI]: Chứa JS, CSS, Media mới được build
└── favicon.ico / assets... <── Các tài nguyên tĩnh đi kèm
```

> [!CAUTION]
> **QUY TẮC BẤT DI BẤT DỊCH**:
> - **KHÔNG ĐƯỢC XÓA HOẶC GHI ĐÈ** thư mục `public_html/api/`. Đây là "trái tim" Backend và kết nối Database của bạn.
> - Chỉ xóa/thay thế các file và thư mục liên quan đến Frontend ở thư mục gốc: `index.html`, thư mục `assets/`, favicon,...

---

## 🛠️ 2. CÁC BƯỚC THỰC HIỆN CHI TIẾT

### BƯỚC 1: Đóng Gói (Build) Frontend Tại Máy Local

1. Mở Terminal tại thư mục dự án `portfolio_project`:
   ```bash
   npm run build
   ```
2. Sau khi chạy xong (khoảng vài giây), hệ thống sẽ tạo ra một thư mục tên là **`dist/`** nằm ngay trong thư mục dự án.
3. Thư mục `dist/` này chứa toàn bộ sản phẩm hoàn chỉnh của Frontend mới:
   - `dist/index.html`
   - `dist/assets/` (các file `.js`, `.css` đã được nén và mã hóa tối ưu hóa tốc độ cao)
   - Các file ảnh, manifest, font đi kèm.

---

### BƯỚC 2: Chuẩn Bị File Điều Hướng `.htaccess` Cho Hosting

Vì dự án dùng React Router (Single Page Application - SPA), khi người dùng truy cập trực tiếp hoặc nhấn F5 ở các đường link con như `https://datdoc.id.vn/admin` hoặc `https://datdoc.id.vn/posts`, server Apache cần chuyển hướng các yêu cầu đó về `index.html` của React mà **không làm ảnh hưởng đến thư mục `/api/`**.

Tạo 1 file tên là `.htaccess` (hoặc mở file `.htaccess` hiện có trong `public_html`) với nội dung chuẩn sau:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Bỏ qua và giữ nguyên toàn bộ request gọi vào Backend API
  RewriteRule ^api/ - [L]

  # 2. Nếu request là file hoặc thư mục thật đang tồn tại thì mở trực tiếp
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # 3. Mọi đường dẫn ảo khác của Frontend (như /admin, /posts,...) chuyển về index.html
  RewriteRule ^ index.html [L]
</IfModule>

# Bật nén Gzip tăng tốc độ tải trang
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

---

### BƯỚC 3: Sao Lưu (Backup) Bản FE Cũ Trên Hosting (Khuyên dùng)

Trước khi thay đổi, hãy sao lưu để đảm bảo an toàn 100%:
1. Đăng nhập vào bảng điều khiển hosting (cPanel / DirectAdmin).
2. Vào mục **File Manager** (Trình quản lý tệp) -> mở thư mục **`public_html`**.
3. Chọn các file FE cũ: `index.html`, thư mục `assets/` cũ.
4. Bấm **Compress (Nén)** thành file `backup_fe_cu.zip` hoặc đổi tên thư mục `assets/` cũ thành `assets_backup/`.

---

### BƯỚC 4: Upload Toàn Bộ Nội Dung Thư Mục `dist/` Lên Hosting

Có 2 cách thực hiện:

#### Cách 1: Sử dụng File Manager trên cPanel (Nhanh & Tiện nhất)
1. Ở máy tính của bạn, vào bên trong thư mục `dist/`, chọn tất cả file và thư mục bên trong rồi nén lại thành file `build.zip`.
2. Mở cPanel **File Manager** -> vào `public_html`.
3. Nhấn **Upload** và tải file `build.zip` lên.
4. Chuột phải vào `build.zip` trên hosting -> chọn **Extract (Giải nén)** trực tiếp vào `public_html`.
5. Kiểm tra đảm bảo file `index.html` và thư mục `assets/` nằm ngay trong `public_html` (không nằm lồng trong một thư mục con `dist/`).
6. Đảm bảo file `.htaccess` đã có nội dung như ở **Bước 2**.

#### Cách 2: Sử dụng phần mềm FTP (FileZilla)
1. Kết nối FileZilla vào hosting qua tài khoản FTP.
2. Bên khung máy tính (bên trái): Mở thư mục `d:\workspace\portfolio_project\dist\`.
3. Bên khung hosting (bên phải): Mở thư mục `public_html/`.
4. Kéo toàn bộ file bên trong `dist/` thả sang `public_html/`.

---

### BƯỚC 5: Kiểm Tra Hoạt Động Của Website Sau Khi Đổi

1. **Kiểm tra Trang chủ**:
   - Mở trình duyệt ẩn danh (`Ctrl + Shift + N`), truy cập: `https://datdoc.id.vn`
   - Kiểm tra xem giao diện mới đã hiển thị đầy đủ, mượt mà chưa.

2. **Kiểm tra Trang Admin & Đăng Nhập**:
   - Truy cập: `https://datdoc.id.vn/admin`
   - Đăng nhập với tài khoản:
     - **Tài khoản**: `admin`
     - **Mật khẩu**: `admin123`
   - Bấm Đăng nhập -> Kiểm tra xem Overview Dashboard có hiện số lượng Dự án và Bài viết từ Database MySQL không.

3. **Kiểm tra Reload trang (F5)**:
   - Khi đang ở `https://datdoc.id.vn/admin`, nhấn `F5`.
   - Nếu trang vẫn tải lại bình thường (không bị lỗi `404 Not Found` của Apache) -> File `.htaccess` đã hoạt động chính xác!

4. **Kiểm tra kết nối API Backend**:
   - Truy cập: `https://datdoc.id.vn/api/docs.php`
   - Kiểm tra xem trang Swagger UI API vẫn mở bình thường.

---

## ❓ 3. CÂU HỎI THƯỜNG GẶP & CÁCH XỬ LÝ SỰ CỐ (TROUBLESHOOTING)

### 1. Tại sao tôi đã upload file mới nhưng vào web vẫn thấy giao diện cũ?
* **Nguyên nhân**: Do trình duyệt hoặc dịch vụ Cloudflare (nếu bạn có dùng) đang lưu cache file `index.html` cũ.
* **Cách xử lý**:
  - Nhấn `Ctrl + F5` hoặc `Ctrl + Shift + R` để xóa cache cứng trình duyệt.
  - Mở web bằng tab ẩn danh (`Incognito`).
  - Nếu dùng Cloudflare: Vào Cloudflare Dashboard -> mục **Caching** -> chọn **Purge Everything**.

### 2. Tại sao F5 ở trang `/admin` lại bị lỗi `404 Not Found`?
* **Nguyên nhân**: Hosting Apache chưa có file `.htaccess` hoặc mod_rewrite chưa được bật.
* **Cách xử lý**: Tạo file `.htaccess` ở thư mục `public_html` theo đúng nội dung ở **Bước 2**.

### 3. Có cần sửa địa chỉ API trong code không?
* **Hoàn toàn không!**
  File `src/services/api.js` đã được thiết lập gọi đường dẫn tương đối `/api/...`. Khi FE nằm trên cùng domain `https://datdoc.id.vn` với BE, trình duyệt sẽ tự động kết nối thẳng vào `https://datdoc.id.vn/api/...` mà không gặp bất kỳ lỗi CORS hay cấu hình proxy nào.
