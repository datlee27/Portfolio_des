# HƯỚNG DẪN TÍCH HỢP CHATBOT VÀO DỰ ÁN PORTFOLIO (REACT)
> Tài liệu cấu hình, API Key/Bot ID và hướng dẫn từng bước dành cho AI Agent hoặc Developer để nhúng Chatbot vào dự án React mới.

---

## 1. THÔNG TIN CẤU HÌNH & CHATBOT KEY

Chatbot trong dự án hiện tại đang sử dụng nền tảng **Chatbase** (AI Chatbot trained on custom data).

| Tham số | Giá trị | Ghi chú |
| :--- | :--- | :--- |
| **Nền tảng** | **Chatbase** ([chatbase.co](https://www.chatbase.co)) | Nền tảng bot AI đã học thông tin portfolio |
| **Bot ID / Script ID** | `c9zgwCRkU8lje3AUpu6-j` | **ID quan trọng nhất dùng để nhúng** |
| **Domain** | `www.chatbase.co` | Domain xác thực widget |
| **Script CDN URL** | `https://www.chatbase.co/embed.min.js` | Script nhúng chính thức của Chatbase |
| **Direct Chat URL (nếu cần iframe)** | `https://www.chatbase.co/chatbot-iframe/c9zgwCRkU8lje3AUpu6-j` | Dùng nếu muốn mở trực tiếp trong iframe/tab mới |

---

## 2. NGUYÊN LÝ HOẠT ĐỘNG TRONG REACT

1. **Lazy Loading Script:** Không nhúng thẻ `<script>` tĩnh vào `index.html` nhằm tối ưu tốc độ tải trang (Lighthouse/Core Web Vitals). Thay vào đó, script được nạp động sau khi trang load xong 2-3 giây thông qua `useEffect`.
2. **Window Proxy Queue:** Tạo một hàm giả lập `window.chatbase` bằng `Proxy` để lưu hàng đợi các lệnh (ví dụ người dùng bấm mở chat khi script chưa tải xong thì không bị lỗi runtime).
3. **Custom Floating Button (FAB):** Ẩn nút mặc định của Chatbase bằng CSS (`#chatbase-bubble-button { display: none !important; }`), thay thế bằng nút UI tự thiết kế ăn khớp với giao diện portfolio.
4. **Trigger Chat:** Bấm vào nút custom sẽ gọi hàm `window.chatbase("open")` để mở popup chat native của Chatbase.

---

## 3. CÁC BƯỚC TRIỂN KHAI CHO AGENT TRONG DỰ ÁN MỚI

### Bước 1: Thêm biến môi trường (Khuyên dùng)
Tạo hoặc bổ sung vào file `.env` của dự án React mới:
```env
VITE_CHATBASE_BOT_ID=c9zgwCRkU8lje3AUpu6-j
```

*(Nếu không dùng biến môi trường, có thể để giá trị mặc định là `'c9zgwCRkU8lje3AUpu6-j'` trực tiếp trong code).*

---

### Bước 2: Cài đặt thư viện phụ thuộc (nếu chưa có)
Trong dự án mới, cài các gói hỗ trợ animation và icon:
```bash
# Nếu dùng npm
npm install motion lucide-react

# Hoặc nếu dự án dùng framer-motion cũ:
# npm install framer-motion lucide-react
```

---

### Bước 3: Tạo Component `Chatbot.tsx`
Tạo file: `src/components/Chatbot.tsx` với nội dung hoàn chỉnh bên dưới:

```tsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquareText } from 'lucide-react';

// Khai báo kiểu cho window.chatbase
declare global {
    interface Window {
        chatbase: any;
    }
}

// Lấy Bot ID từ file .env hoặc fallback về ID mặc định
const CHATBASE_BOT_ID = import.meta.env.VITE_CHATBASE_BOT_ID || 'c9zgwCRkU8lje3AUpu6-j';

export function Chatbot() {
    const [isVisible, setIsVisible] = useState(false);
    const chiselEasing = [0.2, 0, 0, 1] as const;

    useEffect(() => {
        // Kiểm tra nếu script đã tồn tại thì không chèn lại
        if (document.getElementById(CHATBASE_BOT_ID)) {
            setIsVisible(true);
            return;
        }

        // Tạo Proxy / Queue để hứng các sự kiện trước khi script kịp tải
        if (!window.chatbase || window.chatbase("getState") !== "initialized") {
            window.chatbase = (...args: any[]) => {
                if (!window.chatbase.q) { 
                    window.chatbase.q = [];
                }
                window.chatbase.q.push(args);
            };
            window.chatbase = new Proxy(window.chatbase, {
                get(target, prop) {
                    if (prop === "q") return target.q;
                    return (...args: any[]) => target(prop, ...args);
                }
            });
        }

        // Hàm nạp script Chatbase
        const loadChatbot = () => {
            if (document.getElementById(CHATBASE_BOT_ID)) return;

            const script = document.createElement("script");
            script.src = "https://www.chatbase.co/embed.min.js";
            script.id = CHATBASE_BOT_ID;
            script.setAttribute("domain", "www.chatbase.co");
            script.async = true;
            document.body.appendChild(script);

            setIsVisible(true);
        };

        // Lazy load sau 3 giây để tối ưu thời gian phản hồi trang ban đầu
        const timer = setTimeout(loadChatbot, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Hàm kích hoạt mở cửa sổ chat
    const openChat = () => {
        if (window.chatbase) {
            window.chatbase("open");
        }
    };

    return (
        <>
            {/* CSS ghi đè để ẩn nút tròn mặc định của Chatbase và tinh chỉnh kích thước cửa sổ chat */}
            <style dangerouslySetInnerHTML={{
                __html: `
                #chatbase-bubble-button { 
                    display: none !important; 
                }
                #chatbase-bubble-window {
                    max-width: 380px !important;
                    max-height: 80vh !important;
                    height: 540px !important;
                    z-index: 999999 !important;
                }
                @media (max-width: 768px) {
                    #chatbase-bubble-window {
                        max-width: 92vw !important;
                        width: 92vw !important;
                        max-height: 85vh !important;
                        right: 4vw !important;
                        bottom: 4vh !important;
                        left: 4vw !important;
                    }
                }
            `}} />

            {/* Custom Floating Action Button (FAB) */}
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ scale: 0, rotate: -45, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0, rotate: 45, opacity: 0 }}
                        transition={{ duration: 0.5, ease: chiselEasing }}
                        onClick={openChat}
                        className="fixed bottom-6 right-6 z-[9999] group focus:outline-none"
                        aria-label="Open AI Assistant"
                    >
                        <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-black text-white shadow-2xl border-2 border-white/20 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                            {/* Hiệu ứng pulse sóng lan toả */}
                            <span className="absolute -inset-1 rounded-2xl bg-cyan-400/20 blur-sm group-hover:bg-cyan-400/40 transition-all duration-300 animate-pulse" />
                            
                            {/* Icon bot / chat */}
                            <MessageSquareText className="w-7 h-7 md:w-8 md:h-8 relative z-10 transition-transform duration-300 group-hover:rotate-6 text-cyan-400" />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
```

---

### Bước 4: Nhúng vào `App.tsx` hoặc Root Layout
Mở `src/App.tsx` (hoặc `src/routes.tsx` / `RootLayout.tsx`):

```tsx
import { Chatbot } from './components/Chatbot';

export default function App() {
  return (
    <div>
      {/* Các component & routes của bạn */}
      <Chatbot />
    </div>
  );
}
```

---

## 4. CÁC LƯU Ý KHI TRIỂN KHAI

1. **Ảnh logo Bot (nếu muốn dùng lại logo cũ):**
   - File logo robot phong cách Brutalist đã được sao chép sẵn vào: [`public/bot-logo.png`](file:///Users/mac/Subject/Java2/LearnJava/Learn/Bản sao Designpersonalportfolio-React/public/bot-logo.png).
   - Khi copy sang dự án mới, chỉ cần thả file `bot-logo.png` vào thư mục `public/` của dự án mới và dùng thẻ `<img src="/bot-logo.png" alt="Bot" className="w-8 h-8 object-contain" />`.
2. **Nếu dự án mới dùng Next.js (App Router):**
   Thêm directive `'use client';` ở đầu file `Chatbot.tsx` vì component tương tác với `window`, `document` và các hook client-side.
3. **Tuỳ chỉnh theme nút bấm:**
   Nút FAB trong code mẫu đã được cấu hình responsive, hiệu ứng hover, bóng mờ và màu sắc hiện đại. Bạn có thể thay đổi màu nền `bg-black` và màu icon `text-cyan-400` theo đúng bảng màu palette dự án mới.

---

## 5. PROMPT MẪU DÀNH CHO AI AGENT Ở DỰ ÁN MỚI

Khi bạn mở dự án portfolio mới với một Agent AI (Antigravity, Cursor, Windsurf, Copilot, v.v.), hãy copy toàn bộ đoạn prompt sau gửi cho Agent:

```markdown
Tôi muốn nhúng AI Chatbot (Chatbase) vào dự án React portfolio này.
Thông tin cấu hình:
- Bot ID: c9zgwCRkU8lje3AUpu6-j
- Script URL: https://www.chatbase.co/embed.min.js
- Domain: www.chatbase.co

Hãy giúp tôi:
1. Tạo component `src/components/Chatbot.tsx` tích hợp Chatbase bằng cách lazy load sau 3 giây.
2. Ẩn nút tròn mặc định của Chatbase (#chatbase-bubble-button) và tạo nút bấm nổi (Floating Action Button) đẹp, hiện đại, có animation hover ăn khớp với giao diện portfolio.
3. Bấm vào nút này sẽ mở cửa sổ chat (`window.chatbase("open")`).
4. Import và gắn `<Chatbot />` vào file root `App.tsx` (hoặc Layout chính).
```