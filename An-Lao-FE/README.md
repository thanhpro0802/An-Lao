<div align="center">

# 🏥 An Lão — Frontend

**Nền tảng đặt lịch và tư vấn viện dưỡng lão tại Hà Nội**

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📌 Giới thiệu

Repository này là **Frontend** của nền tảng **AnLao.vn** — ứng dụng web giúp người dùng tìm kiếm, xem thông tin chi tiết, đặt lịch tham quan và tư vấn lựa chọn viện dưỡng lão phù hợp tại Hà Nội.

Ứng dụng giao tiếp với [Backend Spring Boot](../An-Lao-BE/README.md) thông qua RESTful API, đồng thời tích hợp **Gemini AI** để hỗ trợ tư vấn thông minh dựa trên nhu cầu từng gia đình.

---

## 🛠️ Tech Stack

| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| **Next.js** | 15 (App Router) | Framework React với SSR/SSG, routing file-based |
| **React** | 19 | UI library, hỗ trợ concurrent features |
| **TypeScript** | 5.9 | Type-safe JavaScript |
| **Tailwind CSS** | v4 | Utility-first CSS framework |
| **Motion** | 12 (Framer Motion) | Animation & micro-interaction |
| **Lexend** | — | Font chữ tiếng Việt tối ưu độ dễ đọc |
| **clsx + tailwind-merge** | — | Utility kết hợp class names có điều kiện |
| **Lucide React** | — | Bộ icon nhất quán |
| **@hookform/resolvers** | — | Tích hợp validation schema cho React Hook Form |
| **@google/genai** | 1.x | Gemini AI SDK cho tính năng tư vấn RAG |

---

## 🚀 Hướng dẫn cài đặt và chạy

### Yêu cầu

- **Node.js** >= 18.x
- **npm** >= 9.x

### Các bước

```bash
# 1. Clone repository
git clone https://github.com/your-org/anlao-frontend.git
cd anlao-frontend

# 2. Cài đặt dependencies
npm install

# 3. Tạo file biến môi trường
cp .env.example .env.local
# Sau đó chỉnh sửa .env.local với các giá trị thực tế (xem mục bên dưới)

# 4. Chạy môi trường development
npm run dev
```

Ứng dụng sẽ chạy tại: [http://localhost:3000](http://localhost:3000)

### Các lệnh khác

```bash
npm run build    # Build production bundle
npm run start    # Chạy production server (sau khi build)
npm run lint     # Kiểm tra lỗi ESLint
npm run clean    # Xoá cache .next
```

---

## 🔐 Biến môi trường

Tạo file `.env.local` ở thư mục gốc với nội dung sau:

```env
# -------------------------------------------------------
#  Backend API (Spring Boot)
# -------------------------------------------------------
# URL gốc của Backend REST API
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# -------------------------------------------------------
#  Gemini AI (cho tính năng tư vấn RAG)
# -------------------------------------------------------
# Lấy tại: https://aistudio.google.com/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# -------------------------------------------------------
#  App
# -------------------------------------------------------
# URL công khai của ứng dụng (dùng cho OAuth callback, SEO)
APP_URL=http://localhost:3000
```

> ⚠️ **Không commit `.env.local`** lên Git. File này đã được thêm vào `.gitignore`.

| Biến | Bắt buộc | Mô tả |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | ✅ | Base URL của Backend Spring Boot |
| `GEMINI_API_KEY` | ✅ | API key Gemini AI cho tư vấn thông minh |
| `APP_URL` | ⚠️ | URL triển khai (cần thiết khi deploy production) |

---

## 📂 Cấu trúc thư mục

```
anlao-frontend/
├── app/                          # Next.js App Router — toàn bộ pages & layouts
│   ├── layout.tsx                # Root layout: font Lexend, metadata, global styles
│   ├── globals.css               # CSS toàn cục và Tailwind base styles
│   ├── page.tsx                  # Trang chủ: danh sách cơ sở, tìm kiếm nhanh, chatbot AI
│   ├── search/
│   │   └── page.tsx              # Trang tìm kiếm & lọc cơ sở dưỡng lão
│   ├── facility/
│   │   └── [id]/
│   │       ├── page.tsx          # Trang chi tiết một cơ sở dưỡng lão
│   │       ├── book/
│   │       │   └── page.tsx      # Trang đặt lịch tham quan
│   │       └── review/           # Trang đánh giá cơ sở
│   ├── appointments/
│   │   └── page.tsx              # Lịch hẹn của người dùng (xem, huỷ lịch)
│   ├── booking-success/          # Trang xác nhận đặt lịch thành công
│   ├── notifications/
│   │   └── page.tsx              # Thông báo hệ thống
│   └── profile/
│       └── page.tsx              # Hồ sơ cá nhân người dùng
│
├── components/                   # Shared UI components tái sử dụng
│   └── BottomNav.tsx             # Thanh điều hướng bottom navigation (mobile-first)
│
├── hooks/                        # Custom React hooks
│   └── use-mobile.ts             # useIsMobile() — phát hiện thiết bị mobile (< 768px)
│
├── lib/                          # Utilities & helpers dùng chung
│   └── utils.ts                  # Hàm cn() — kết hợp clsx + tailwind-merge
│
├── .env.local                    # Biến môi trường cục bộ (không commit)
├── .env.example                  # Template biến môi trường
├── next.config.ts                # Cấu hình Next.js (image domains, standalone output)
├── tsconfig.json                 # Cấu hình TypeScript
├── postcss.config.mjs            # Cấu hình PostCSS cho Tailwind v4
└── package.json                  # Dependencies & scripts
```

### Chi tiết các thư mục

#### `/app` — Pages & Routing
Sử dụng **App Router** của Next.js 15. Mỗi thư mục tương ứng một route, mỗi `page.tsx` là một Server hoặc Client Component. Root layout (`layout.tsx`) áp dụng font **Lexend** (hỗ trợ tiếng Việt) và metadata SEO toàn cục.

#### `/components` — Shared Components
Chứa các component UI dùng chung giữa nhiều trang. Hiện có `BottomNav.tsx` — thanh điều hướng cố định phía dưới màn hình theo phong cách mobile app (Home, Tìm kiếm, Lịch hẹn, Thông báo, Hồ sơ).

#### `/hooks` — Custom Hooks
Tách biệt logic phức tạp ra khỏi component. `useIsMobile()` theo dõi `window.matchMedia` để phản hồi breakpoint 768px, phục vụ responsive layout.

#### `/lib` — Utilities
Hàm `cn(...inputs)` kết hợp `clsx` và `tailwind-merge`, giúp merge class Tailwind có điều kiện mà không bị xung đột.

---

## 🌐 Các trang chính

| Route | Mô tả |
|---|---|
| `/` | Trang chủ — danh sách cơ sở nổi bật, chatbot tư vấn AI |
| `/search` | Tìm kiếm và lọc cơ sở dưỡng lão |
| `/facility/[id]` | Chi tiết cơ sở: ảnh, dịch vụ, giá, đánh giá |
| `/facility/[id]/book` | Đặt lịch tham quan cơ sở |
| `/appointments` | Quản lý lịch hẹn của người dùng |
| `/booking-success` | Xác nhận đặt lịch thành công |
| `/notifications` | Trung tâm thông báo |
| `/profile` | Hồ sơ và cài đặt tài khoản |

---

## 🔗 Liên quan

- **Backend (Spring Boot):** [`../An-Lao-BE`](../An-Lao-BE/README.md) — REST API & RAG pipeline
- **Production:** [https://anlao.vn](https://anlao.vn)

---

<div align="center">

**An Lão** — Kết nối gia đình với sự chăm sóc tốt nhất 💚

</div>
