# 🚀 HƯỚNG DẪN CẬP NHẬT FILE API/INDEX.PHP TRÊN HOSTING

> **Mục tiêu**: Đồng bộ 100% dữ liệu **Hành Trình & About (Experience)** giữa Admin và Cơ sở dữ liệu MySQL trên domain `datdoc.id.vn`.

File mã nguồn PHP hoàn chỉnh đã được tạo sẵn tại:  
📁 [`backend/index.php`](file:///Users/mac/Project/portfolio_desnew/Portfolio_des/backend/index.php)

---

## 📌 Cách 1: Nhanh nhất (Chỉ copy đoạn code Experience dán vào file hiện có)

Nếu bạn không muốn thay đổi kết nối Database hiện tại trên hosting:

1. Đăng nhập vào hosting (cPanel / DirectAdmin) -> Mở **File Manager** -> vào thư mục **`public_html/api/`** -> mở file **`index.php`** bằng Edit (Chỉnh sửa).
2. Tìm đến các nhánh `if ($type === 'personal')` hoặc `if ($type === 'project')`:

### A. Trong nhánh `POST`:
Thêm đoạn sau:
```php
if ($type === 'experience') {
    $title   = $body['title'] ?? ($body['role'] ?? '');
    $company = $body['company'] ?? ($body['place'] ?? '');
    $period  = $body['period'] ?? 'ongoing';
    $desc    = $body['description'] ?? '';

    $stmt = $pdo->prepare("INSERT INTO experience (title, company, period, description) VALUES (?, ?, ?, ?)");
    $stmt->execute([$title, $company, $period, $desc]);
    $newId = (string)$pdo->lastInsertId();

    http_response_code(201);
    echo json_encode([
        'success'   => true,
        'data'      => ['id' => $newId],
        'message'   => 'Experience added successfully',
        'timestamp' => time(),
    ]);
    exit;
}
```

### B. Trong nhánh `PUT`:
Thêm đoạn sau:
```php
if ($type === 'experience') {
    if ($id) {
        $title   = $body['title'] ?? ($body['role'] ?? '');
        $company = $body['company'] ?? ($body['place'] ?? '');
        $period  = $body['period'] ?? 'ongoing';
        $desc    = $body['description'] ?? '';

        $stmt = $pdo->prepare("UPDATE experience SET title = ?, company = ?, period = ?, description = ? WHERE id = ?");
        $stmt->execute([$title, $company, $period, $desc, $id]);

        echo json_encode([
            'success'   => true,
            'data'      => [],
            'message'   => 'Experience updated successfully',
            'timestamp' => time(),
        ]);
        exit;
    } else if (is_array($body)) {
        $pdo->exec("DELETE FROM experience");
        $stmt = $pdo->prepare("INSERT INTO experience (title, company, period, description) VALUES (?, ?, ?, ?)");
        foreach ($body as $item) {
            $t = $item['title'] ?? ($item['role'] ?? '');
            $c = $item['company'] ?? ($item['place'] ?? '');
            $p = $item['period'] ?? 'ongoing';
            $d = $item['description'] ?? '';
            if (!empty($t) || !empty($c)) {
                $stmt->execute([$t, $c, $p, $d]);
            }
        }
        echo json_encode([
            'success'   => true,
            'data'      => [],
            'message'   => 'All experiences synchronized successfully',
            'timestamp' => time(),
        ]);
        exit;
    }
}
```

### C. Trong nhánh `DELETE`:
Thêm đoạn sau:
```php
if ($type === 'experience' && $id) {
    $stmt = $pdo->prepare("DELETE FROM experience WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode([
        'success'   => true,
        'data'      => [],
        'message'   => 'Experience deleted successfully',
        'timestamp' => time(),
    ]);
    exit;
}
```
3. Bấm **Save Changes (Lưu thay đổi)** trên cPanel.

---

## 📌 Cách 2: Copy toàn bộ nội dung file `backend/index.php`

1. Mở file [`backend/index.php`](file:///Users/mac/Project/portfolio_desnew/Portfolio_des/backend/index.php) trong dự án này.
2. Kiểm tra thông tin Database ở các dòng 34-37 (`$dbHost`, `$dbName`, `$dbUser`, `$dbPass`) cho khớp với thông tin hosting của bạn (hoặc nếu bạn đã có file `db.php` thì file sẽ tự động nhận).
3. Copy toàn bộ nội dung và dán vào file **`public_html/api/index.php`** trên hosting.
4. Bấm **Save Changes**.
