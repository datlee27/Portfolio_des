<?php
/**
 * ─────────────────────────────────────────────────────────────
 * Personal Portfolio & Blog API - Main Router & Controller
 * File: public_html/api/index.php
 * Domain: https://datdoc.id.vn/api/
 * ─────────────────────────────────────────────────────────────
 */

// 1. Khởi động Session để nhận diện Admin đăng nhập từ auth.php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// 2. Thiết lập Headers CORS và Content-Type JSON
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Xử lý Preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 3. Cấu hình Kết nối Database MySQL
// (LƯU Ý: Nếu trên hosting bạn có file db.php hoặc config.php riêng, bạn có thể require_once 'db.php';
//  hoặc điều chỉnh 4 biến bên dưới cho đúng với Database trên cPanel của bạn)
$dbHost = defined('DB_HOST') ? DB_HOST : 'localhost';
$dbName = defined('DB_NAME') ? DB_NAME : 'datdoc_portfolio'; 
$dbUser = defined('DB_USER') ? DB_USER : 'datdoc_user';
$dbPass = defined('DB_PASS') ? DB_PASS : '';

// Kết nối PDO
try {
    // Nếu có file cấu hình kết nối database riêng cùng thư mục
    if (file_exists(__DIR__ . '/db.php')) {
        require_once __DIR__ . '/db.php';
    } elseif (file_exists(__DIR__ . '/config.php')) {
        require_once __DIR__ . '/config.php';
    }

    if (!isset($pdo)) {
        $dsn = "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4";
        $pdo = new PDO($dsn, $dbUser, $dbPass, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success'   => false,
        'data'      => [],
        'message'   => 'Lỗi kết nối cơ sở dữ liệu: ' . $e->getMessage(),
        'timestamp' => time(),
    ]);
    exit;
}

// Hàm trợ giúp kiểm tra quyền Admin
function checkAdminAuth() {
    if (!empty($_SESSION['admin_logged_in']) || !empty($_SESSION['admin']) || !empty($_SESSION['user'])) {
        return true;
    }
    // Cho phép xác thực qua Authorization Bearer hoặc Session
    http_response_code(401);
    echo json_encode([
        'success'   => false,
        'data'      => [],
        'message'   => 'Unauthorized',
        'timestamp' => time(),
    ]);
    exit;
}

// Đọc dữ liệu đầu vào
$method = $_SERVER['REQUEST_METHOD'];
$endpoint = $_GET['endpoint'] ?? '';
$type = $_GET['type'] ?? '';
$id = $_GET['id'] ?? null;
$rawInput = file_get_contents('php://input');
$body = json_decode($rawInput, true) ?: [];

// ─────────────────────────────────────────────────────────────
// ROUTER CHÍNH
// ─────────────────────────────────────────────────────────────

// ─── 1. Endpoint: setup-portfolio (Khởi tạo bảng MySQL) ───
if ($endpoint === 'setup-portfolio') {
    try {
        // Bảng personal
        $pdo->exec("CREATE TABLE IF NOT EXISTS personal (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            short_name VARCHAR(100),
            title VARCHAR(255),
            role VARCHAR(255),
            bio TEXT,
            identity_statement TEXT,
            hero_subtext TEXT,
            status VARCHAR(255),
            coordinates VARCHAR(100),
            avatar_url TEXT,
            cv_url TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )");

        // Tự động bổ sung cột cv_url nếu bảng đã tồn tại từ trước mà chưa có
        try {
            $pdo->exec("ALTER TABLE personal ADD COLUMN cv_url TEXT AFTER avatar_url");
        } catch (Exception $e) {
            // Cột cv_url đã tồn tại
        }

        // Bảng projects
        $pdo->exec("CREATE TABLE IF NOT EXISTS projects (
            id INT AUTO_INCREMENT PRIMARY KEY,
            project_code VARCHAR(50),
            title VARCHAR(255) NOT NULL,
            description TEXT,
            image_url TEXT,
            tags TEXT,
            github_url TEXT,
            deploy_url TEXT,
            video_demo TEXT,
            status VARCHAR(100) DEFAULT 'Latest',
            sort_order INT DEFAULT 0,
            is_public TINYINT(1) DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )");

        try {
            $pdo->exec("ALTER TABLE projects ADD COLUMN is_public TINYINT(1) DEFAULT 1");
        } catch (Exception $e) {}

        // Bảng skills
        $pdo->exec("CREATE TABLE IF NOT EXISTS skills (
            id INT AUTO_INCREMENT PRIMARY KEY,
            category VARCHAR(100) NOT NULL,
            items TEXT NOT NULL
        )");

        // Bảng experience (Hành trình, công việc, học vấn)
        $pdo->exec("CREATE TABLE IF NOT EXISTS experience (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            company VARCHAR(255) NOT NULL,
            period VARCHAR(100) NOT NULL,
            description TEXT
        )");

        echo json_encode([
            'success'   => true,
            'data'      => [],
            'message'   => 'Portfolio database tables and sample data initialized successfully!',
            'timestamp' => time(),
        ]);
        exit;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success'   => false,
            'data'      => [],
            'message'   => 'Setup error: ' . $e->getMessage(),
            'timestamp' => time(),
        ]);
        exit;
    }
}

// ─── 2. Endpoint: swagger ───
if ($endpoint === 'swagger') {
    $swaggerFile = __DIR__ . '/swagger.json';
    if (file_exists($swaggerFile)) {
        echo file_get_contents($swaggerFile);
    } else {
        echo json_encode(['openapi' => '3.0.3', 'info' => ['title' => 'Portfolio API']]);
    }
    exit;
}

// ─── 3. Endpoint: portfolio (CRUD Dự Án, Cá Nhân, Kỹ Năng, Hành Trình) ───
if ($endpoint === 'portfolio') {

    // [GET] Lấy toàn bộ dữ liệu Portfolio
    if ($method === 'GET') {
        try {
            // Lấy Personal
            $stmt = $pdo->query("SELECT * FROM personal ORDER BY id DESC LIMIT 1");
            $personal = $stmt->fetch() ?: (object)[];

            // Lấy Projects
            $stmt = $pdo->query("SELECT * FROM projects ORDER BY sort_order ASC, id DESC");
            $projectsRaw = $stmt->fetchAll();
            $projects = array_map(function($p) {
                // Parse tags if JSON string or comma-separated
                if (!empty($p['tags'])) {
                    $decoded = json_decode($p['tags'], true);
                    $p['tags'] = is_array($decoded) ? $decoded : array_map('trim', explode(',', $p['tags']));
                } else {
                    $p['tags'] = [];
                }
                return $p;
            }, $projectsRaw);

            // Lấy Skills
            $stmt = $pdo->query("SELECT * FROM skills ORDER BY id ASC");
            $skillsRaw = $stmt->fetchAll();
            $skills = array_map(function($s) {
                if (!empty($s['items'])) {
                    $decoded = json_decode($s['items'], true);
                    $s['items'] = is_array($decoded) ? $decoded : array_map('trim', explode(',', $s['items']));
                } else {
                    $s['items'] = [];
                }
                return $s;
            }, $skillsRaw);

            // Lấy Experience
            $stmt = $pdo->query("SELECT * FROM experience ORDER BY id DESC");
            $experience = $stmt->fetchAll();

            echo json_encode([
                'success'   => true,
                'data'      => [
                    'personal'   => $personal,
                    'projects'   => $projects,
                    'skills'     => $skills,
                    'experience' => $experience,
                ],
                'message'   => 'Portfolio data retrieved successfully',
                'timestamp' => time(),
            ]);
            exit;
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success'   => false,
                'data'      => [],
                'message'   => 'Lỗi truy vấn: ' . $e->getMessage(),
                'timestamp' => time(),
            ]);
            exit;
        }
    }

    // Yêu cầu quyền Admin cho các thao tác ghi dữ liệu (POST, PUT, DELETE)
    checkAdminAuth();

    // ─────────────────────────────────────────────────────────
    // [POST] Thêm mới dữ liệu
    // ─────────────────────────────────────────────────────────
    if ($method === 'POST') {
        // Thêm Project
        if ($type === 'project') {
            $tagsJson = is_array($body['tags'] ?? null) ? json_encode($body['tags'], JSON_UNESCAPED_UNICODE) : ($body['tags'] ?? '');
            $isPublicVal = isset($body['is_public']) ? ((int)$body['is_public'] === 0 || $body['is_public'] === false || $body['is_public'] === '0' ? 0 : 1) : 1;
            $stmt = $pdo->prepare("INSERT INTO projects (project_code, title, description, image_url, tags, github_url, deploy_url, video_demo, status, sort_order, is_public) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $body['project_code'] ?? '01',
                $body['title'] ?? 'Dự án mới',
                $body['description'] ?? '',
                $body['image_url'] ?? '',
                $tagsJson,
                $body['github_url'] ?? '',
                $body['deploy_url'] ?? '',
                $body['video_demo'] ?? ($body['video_url'] ?? ''),
                $body['status'] ?? 'Latest',
                $body['sort_order'] ?? 0,
                $isPublicVal,
            ]);
            $newId = (string)$pdo->lastInsertId();
            http_response_code(201);
            echo json_encode([
                'success'   => true,
                'data'      => ['id' => $newId],
                'message'   => 'Project added successfully',
                'timestamp' => time(),
            ]);
            exit;
        }

        // Thêm Experience (Hành trình / Công việc mới)
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

        // Thêm Skill
        if ($type === 'skill') {
            $itemsJson = is_array($body['items'] ?? null) ? json_encode($body['items'], JSON_UNESCAPED_UNICODE) : ($body['items'] ?? '');
            $stmt = $pdo->prepare("INSERT INTO skills (category, items) VALUES (?, ?)");
            $stmt->execute([
                strtoupper(trim($body['category'] ?? 'GENERAL')),
                $itemsJson,
            ]);
            $newId = (string)$pdo->lastInsertId();
            http_response_code(201);
            echo json_encode([
                'success'   => true,
                'data'      => ['id' => $newId],
                'message'   => 'Skill category created successfully',
                'timestamp' => time(),
            ]);
            exit;
        }
    }

    // ─────────────────────────────────────────────────────────
    // [PUT] Cập nhật dữ liệu
    // ─────────────────────────────────────────────────────────
    if ($method === 'PUT') {
        // Cập nhật Personal Info
        if ($type === 'personal') {
            // Kiểm tra xem đã có dòng nào trong bảng personal chưa
            $stmt = $pdo->query("SELECT id FROM personal ORDER BY id DESC LIMIT 1");
            $existing = $stmt->fetch();

            if ($existing) {
                $stmt = $pdo->prepare("UPDATE personal SET name = ?, short_name = ?, title = ?, role = ?, bio = ?, identity_statement = ?, hero_subtext = ?, status = ?, coordinates = ?, avatar_url = ?, cv_url = ? WHERE id = ?");
                $stmt->execute([
                    $body['name'] ?? '',
                    $body['short_name'] ?? '',
                    $body['title'] ?? '',
                    $body['role'] ?? '',
                    $body['bio'] ?? '',
                    $body['identity_statement'] ?? '',
                    $body['hero_subtext'] ?? '',
                    $body['status'] ?? '',
                    $body['coordinates'] ?? '',
                    $body['avatar_url'] ?? '',
                    $body['cv_url'] ?? '',
                    $existing['id'],
                ]);
            } else {
                $stmt = $pdo->prepare("INSERT INTO personal (name, short_name, title, role, bio, identity_statement, hero_subtext, status, coordinates, avatar_url, cv_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([
                    $body['name'] ?? '',
                    $body['short_name'] ?? '',
                    $body['title'] ?? '',
                    $body['role'] ?? '',
                    $body['bio'] ?? '',
                    $body['identity_statement'] ?? '',
                    $body['hero_subtext'] ?? '',
                    $body['status'] ?? '',
                    $body['coordinates'] ?? '',
                    $body['avatar_url'] ?? '',
                    $body['cv_url'] ?? '',
                ]);
            }

            echo json_encode([
                'success'   => true,
                'data'      => [],
                'message'   => 'Personal info updated successfully',
                'timestamp' => time(),
            ]);
            exit;
        }

        // Cập nhật Project
        if ($type === 'project' && $id) {
            $tagsJson = is_array($body['tags'] ?? null) ? json_encode($body['tags'], JSON_UNESCAPED_UNICODE) : ($body['tags'] ?? '');
            
            // Hỗ trợ cập nhật sort_order hoặc is_public riêng lẻ hoặc đầy đủ
            if (isset($body['sort_order']) && !isset($body['title'])) {
                $stmt = $pdo->prepare("UPDATE projects SET sort_order = ? WHERE id = ?");
                $stmt->execute([(int)$body['sort_order'], $id]);
            } else if (isset($body['is_public']) && !isset($body['title'])) {
                $stmt = $pdo->prepare("UPDATE projects SET is_public = ? WHERE id = ?");
                $stmt->execute([(int)$body['is_public'], $id]);
            } else {
                $isPublicVal = isset($body['is_public']) ? (int)$body['is_public'] : 1;
                $sortOrderVal = isset($body['sort_order']) ? (int)$body['sort_order'] : 0;
                $stmt = $pdo->prepare("UPDATE projects SET project_code = ?, title = ?, description = ?, image_url = ?, tags = ?, github_url = ?, deploy_url = ?, video_demo = ?, status = ?, sort_order = ?, is_public = ? WHERE id = ?");
                $stmt->execute([
                    $body['project_code'] ?? '01',
                    $body['title'] ?? '',
                    $body['description'] ?? '',
                    $body['image_url'] ?? '',
                    $tagsJson,
                    $body['github_url'] ?? '',
                    $body['deploy_url'] ?? '',
                    $body['video_demo'] ?? ($body['video_url'] ?? ''),
                    $body['status'] ?? 'Latest',
                    $sortOrderVal,
                    $isPublicVal,
                    $id,
                ]);
            }
            echo json_encode([
                'success'   => true,
                'data'      => [],
                'message'   => 'Project updated successfully',
                'timestamp' => time(),
            ]);
            exit;
        }

        // Cập nhật Experience (Hành trình)
        if ($type === 'experience') {
            if ($id) {
                // Cập nhật 1 mục cụ thể
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
                // Đồng bộ hàng loạt toàn bộ danh sách (để giữ thứ tự ưu tiên)
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

        // Cập nhật Skill
        if ($type === 'skill' && $id) {
            $itemsJson = is_array($body['items'] ?? null) ? json_encode($body['items'], JSON_UNESCAPED_UNICODE) : ($body['items'] ?? '');
            $stmt = $pdo->prepare("UPDATE skills SET category = ?, items = ? WHERE id = ?");
            $stmt->execute([
                strtoupper(trim($body['category'] ?? '')),
                $itemsJson,
                $id,
            ]);
            echo json_encode([
                'success'   => true,
                'data'      => [],
                'message'   => 'Skill updated successfully',
                'timestamp' => time(),
            ]);
            exit;
        }

        // Cập nhật toàn bộ Skills (mảng)
        if ($type === 'skills' && is_array($body)) {
            $pdo->exec("DELETE FROM skills");
            $stmt = $pdo->prepare("INSERT INTO skills (category, items) VALUES (?, ?)");
            foreach ($body as $item) {
                $cat = strtoupper(trim($item['category'] ?? ''));
                $itemsJson = is_array($item['items'] ?? null) ? json_encode($item['items'], JSON_UNESCAPED_UNICODE) : ($item['items'] ?? '');
                if (!empty($cat)) {
                    $stmt->execute([$cat, $itemsJson]);
                }
            }
            echo json_encode([
                'success'   => true,
                'data'      => [],
                'message'   => 'Skills synchronized successfully',
                'timestamp' => time(),
            ]);
            exit;
        }
    }

    // ─────────────────────────────────────────────────────────
    // [DELETE] Xóa dữ liệu
    // ─────────────────────────────────────────────────────────
    if ($method === 'DELETE') {
        if ($type === 'project' && $id) {
            $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode([
                'success'   => true,
                'data'      => [],
                'message'   => 'Project deleted successfully',
                'timestamp' => time(),
            ]);
            exit;
        }

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

        if ($type === 'skill' && $id) {
            $stmt = $pdo->prepare("DELETE FROM skills WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode([
                'success'   => true,
                'data'      => [],
                'message'   => 'Skill category deleted successfully',
                'timestamp' => time(),
            ]);
            exit;
        }
    }
}

// ─── 4. Endpoint: posts (Quản lý Bài viết Blog) ───
if ($endpoint === 'posts') {
    // [GET] Danh sách bài viết
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM posts ORDER BY id DESC");
        $posts = $stmt->fetchAll();
        echo json_encode([
            'success'   => true,
            'data'      => $posts,
            'message'   => 'Posts retrieved successfully',
            'timestamp' => time(),
        ]);
        exit;
    }

    // Yêu cầu quyền Admin cho thao tác viết bài
    checkAdminAuth();

    if ($method === 'POST') {
        $stmt = $pdo->prepare("INSERT INTO posts (title, slug, excerpt, content, author, published_date, read_time, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $body['title'] ?? 'Bài viết mới',
            $body['slug'] ?? ('post-' . time()),
            $body['excerpt'] ?? '',
            $body['content'] ?? '',
            $body['author'] ?? 'Admin',
            $body['published_date'] ?? date('Y-m-d'),
            $body['read_time'] ?? 5,
            $body['image_url'] ?? '',
        ]);
        $newId = (string)$pdo->lastInsertId();
        http_response_code(201);
        echo json_encode([
            'success'   => true,
            'data'      => ['id' => $newId],
            'message'   => 'Post created successfully',
            'timestamp' => time(),
        ]);
        exit;
    }
}

// Mặc định trả về lỗi nếu không khớp endpoint nào
http_response_code(404);
echo json_encode([
    'success'   => false,
    'data'      => [],
    'message'   => 'Invalid endpoint',
    'timestamp' => time(),
]);
exit;
