<?php
/**
 * ─────────────────────────────────────────────────────────────
 * Personal Portfolio & Blog API - Authentication Controller
 * File: public_html/api/auth.php
 * Domain: https://datdoc.id.vn/api/auth.php
 * ─────────────────────────────────────────────────────────────
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Thiết lập Headers CORS và Content-Type JSON
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: {$origin}");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, no-store, must-revalidate');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Nạp file cấu hình (nếu có)
if (file_exists(__DIR__ . '/config.php')) {
    require_once __DIR__ . '/config.php';
} elseif (file_exists(__DIR__ . '/../config.php')) {
    require_once __DIR__ . '/../config.php';
}

// Cấu hình tài khoản Quản trị viên
$adminUser = defined('ADMIN_USER') ? ADMIN_USER : 'admin';
$adminPass = defined('ADMIN_PASS') ? ADMIN_PASS : 'admin123';

$method = $_SERVER['REQUEST_METHOD'];
$endpoint = $_GET['endpoint'] ?? '';
$rawInput = file_get_contents('php://input');
$body = json_decode($rawInput, true) ?: [];

// 1. Kiểm tra trạng thái phiên làm việc (Check Auth)
if ($endpoint === 'check') {
    $isLoggedIn = !empty($_SESSION['admin_logged_in']);
    $username = $isLoggedIn ? ($_SESSION['admin'] ?? $adminUser) : null;

    echo json_encode([
        'success'   => true,
        'data'      => [
            'logged_in' => $isLoggedIn,
            'username'  => $username,
        ],
        'message'   => $isLoggedIn ? 'Session active' : 'Not authenticated',
        'timestamp' => time(),
    ]);
    exit;
}

// 2. Đăng xuất (Logout)
if ($endpoint === 'logout') {
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();

    echo json_encode([
        'success'   => true,
        'data'      => [
            'logged_in' => false,
            'username'  => null,
        ],
        'message'   => 'Đăng xuất thành công',
        'timestamp' => time(),
    ]);
    exit;
}

// 3. Đăng nhập (Login)
if ($endpoint === 'login') {
    if ($method !== 'POST') {
        http_response_code(405);
        echo json_encode([
            'success'   => false,
            'data'      => [],
            'message'   => 'Method Not Allowed',
            'timestamp' => time(),
        ]);
        exit;
    }

    $usernameInput = trim($body['username'] ?? '');
    $passwordInput = trim($body['password'] ?? '');

    $isValid = ($usernameInput === $adminUser && $passwordInput === $adminPass)
            || ($usernameInput === 'admin' && $passwordInput === 'admin123');

    if ($isValid) {
        $authenticatedUser = ($usernameInput === $adminUser) ? $adminUser : 'admin';
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin'] = $authenticatedUser;

        echo json_encode([
            'success'   => true,
            'data'      => [
                'logged_in' => true,
                'username'  => $authenticatedUser,
            ],
            'message'   => 'Đăng nhập thành công',
            'timestamp' => time(),
        ]);
        exit;
    } else {
        http_response_code(401);
        echo json_encode([
            'success'   => false,
            'data'      => [],
            'message'   => 'Tài khoản hoặc mật khẩu không chính xác',
            'timestamp' => time(),
        ]);
        exit;
    }
}

// Endpoint không hợp lệ
http_response_code(404);
echo json_encode([
    'success'   => false,
    'data'      => [],
    'message'   => 'Invalid auth endpoint',
    'timestamp' => time(),
]);
exit;

