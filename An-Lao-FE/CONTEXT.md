# AnLao.vn Frontend — AI Developer Context

Chào AI (Cursor / GitHub Copilot / LLM agent), đây là tệp ngữ cảnh (context) dành riêng cho bạn khi hỗ trợ viết code cho dự án **AnLao.vn Frontend**. Hãy đọc kỹ và tuân thủ tuyệt đối các quy định khắt khe dưới đây.

---

## 1. Công nghệ Lõi & Kiến trúc (Next.js 15 & React 19)
- **Framework:** Next.js 15 kết hợp React 19.
- **Routing:** BẮT BUỘC sử dụng **App Router** (thư mục `/app`). TUYỆT ĐỐI KHÔNG sử dụng cấu trúc Pages Router cũ (không tạo thư mục `/pages`).
- **Server Components là Mặc định:** Luôn ưu tiên thiết kế các React Server Components (RSC) để tối ưu SEO, bảo mật thông tin và giảm tải JavaScript xuống client.
- **Quy tắc `"use client"`:** CHỈ SỬ DỤNG `"use client"` ở đầu file khi Component thực sự bắt buộc phải render ở phía Client. Các trường hợp đó bao gồm:
  - Cần sử dụng React hooks (`useState`, `useEffect`, `useRef`, `useTransition`, ...).
  - Cần gán các event listeners (`onClick`, `onChange`, ...).
  - Cần tương tác với Browser DOM hoặc Web APIs (window, localStorage).
  - Cần sử dụng các thư viện UI bắt buộc chạy trên client (như `motion` từ Framer Motion).

## 2. Styling (Tailwind CSS v4)
- Dự án đang sử dụng **Tailwind CSS v4**. Hãy tận dụng sức mạnh của CSS engine mới này (ít cần file cấu hình `tailwind.config.js` phức tạp như trước).
- **Utility cn():** Luôn sử dụng hàm `cn()` (tích hợp sẵn trong `/lib/utils.ts`) khi cần nối các chuỗi class động có điều kiện để tránh xung đột CSS (nhờ `tailwind-merge`).

## 3. TypeScript (Strict Mode)
- **Strict Mode:** Dự án áp dụng TypeScript Strict Mode.
- **Tuyệt đối không dùng `any`:** BẠN BỊ CẤM sử dụng kiểu `any` trong mọi trường hợp. Mọi props component, state hook, và API response phải được định nghĩa `interface` hoặc `type` cụ thể. 
- Nếu một kiểu dữ liệu trả về chưa xác định, hãy dùng `unknown` và thực hiện type checking (type guards).

## 4. Data Fetching (Giao tiếp API)
- **Chỉ dùng Fetch API của Next.js:** Tuyệt đối không tự ý cài đặt hay sử dụng thư viện bên thứ 3 như `axios` để gọi API. Bắt buộc dùng `fetch()` gốc của Next.js để tận dụng hệ thống cache.
- **Caching & Revalidation:** Tùy vào tính chất dữ liệu, phải áp dụng cấu hình hợp lý:
  - Dữ liệu tĩnh (ít đổi): Sử dụng mặc định hoặc `{ cache: 'force-cache' }`.
  - Dữ liệu realtime/cá nhân (Lịch hẹn, Profile): Bắt buộc dùng `{ cache: 'no-store' }`.
  - Dữ liệu định kỳ cập nhật: Sử dụng ISR `{ next: { revalidate: 3600 } }`.
- **Server Actions:** Với các thao tác Mutation (Tạo, Xóa, Sửa dữ liệu / Gọi POST, PUT), ưu tiên sử dụng Server Actions của Next.js (hàm có `"use server"`) kết hợp với hàm `revalidatePath()` để làm mới dữ liệu.

## 5. Bảo mật & Quản lý Biến môi trường
- **Zero-Hardcoding:** Tính bảo mật phải được đặt lên hàng đầu. KHÔNG BAO GIỜ lưu cứng (hardcode) các thông tin nhạy cảm vào source code (như Endpoint URL, DB credentials, API Keys).
- **Quản lý .env:** Mọi thông tin cấu hình phải gọi qua `process.env`.
  - Nếu biến đó cần gọi trực tiếp từ trình duyệt (Client Components), biến phải bắt đầu bằng **`NEXT_PUBLIC_`** (VD: `NEXT_PUBLIC_API_URL`).
  - Nếu biến đó là Secret Key (VD: `GEMINI_API_KEY`) thì tuyệt đối không được thêm `NEXT_PUBLIC_` để tránh việc Next.js đóng gói chuỗi này xuống trình duyệt gây lộ lọt thông tin. Các hàm có sử dụng Secret Keys bắt buộc phải chạy ở Server Components hoặc Server Actions.

---
> **Trách nhiệm của bạn:** Hãy sinh ra mã nguồn sạch (Clean Code), viết tên biến và hàm tường minh bằng tiếng Anh. Code của bạn sẽ định hình chất lượng dự án An Lão.
