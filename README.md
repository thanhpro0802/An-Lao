<div align="center">

# 🏥 AnLao.vn — Nền Tảng Đặt Lịch Viện Dưỡng Lão & Tư Vấn AI

**Hệ thống tìm kiếm, so sánh và đặt lịch hẹn thông minh kết hợp trợ lý ảo AI (RAG) tư vấn viện dưỡng lão tại Việt Nam.**

[![Next.js](https://img.shields.io/badge/Next.js-15.x-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📌 Giới thiệu dự án

**AnLao.vn** là một nền tảng Monorepo tích hợp toàn diện gồm ứng dụng Frontend tương tác hiện đại và dịch vụ API Backend mạnh mẽ hỗ trợ tìm kiếm, so sánh chi tiết và đặt lịch tham quan tại 14 cơ sở dưỡng lão uy tín. Dự án nổi bật với module **Trợ lý AI tư vấn** ứng dụng công nghệ **RAG (Retrieval-Augmented Generation)** để giải đáp thắc mắc của khách hàng dựa trên dữ liệu thực tế được cập nhật thường xuyên.

### 📐 Kiến trúc hệ thống
```text
             [ Trình duyệt / Client ]
                      │ (Next.js 15 App)
                      ▼
               [ API Gateway / CORS ]
                      │ (Spring Security JWT)
                      ▼
             [ Spring Boot Services ] ◄───► [ Gemini API ] (gemini-2.5-flash)
                      │
           ┌──────────┴──────────┐
           ▼                     ▼
    [ PostgreSQL ] ◄───────► [ pgvector ]
  (Dữ liệu quan hệ)       (Tìm kiếm ngữ nghĩa 768-dim)
```

---

## ✨ Các tính năng cốt lõi

### 1. Phân hệ Khách hàng (Frontend Portal)
* **Tìm kiếm & Bộ lọc nâng cao:** Lọc cơ sở dưỡng lão theo Quận/Huyện, mức giá (min/max), loại hình chăm sóc (nội trú, bán trú, tại gia) và các dịch vụ đi kèm.
* **Đặt lịch hẹn trực tuyến:** Chọn ngày giờ, điền thông tin và đặt lịch tham quan/tư vấn tại cơ sở mong muốn.
* **Đánh giá & Phản hồi:** Nơi gia đình để lại bình luận và thang điểm đánh giá chất lượng thực tế.
* **Tư vấn AI (Chatbot RAG):** Chatbot thông minh tự động trích xuất thông tin các cơ sở dưỡng lão phù hợp dựa trên vị trí, khoảng giá hoặc nhu cầu chăm sóc cụ thể.

### 2. Phân hệ Quản trị (Admin CMS)
* **Quản lý Cơ sở (Facilities CRUD):** Thêm mới, chỉnh sửa thông tin chi tiết (địa chỉ, mức giá, bao gồm/loại trừ, tags tiện ích).
* **Độ tin cậy & Cảnh báo:** Hệ thống cảnh báo tự động về chất lượng (ví dụ: các cơ sở có nguy cơ seeding đánh giá hoặc vệ sinh kém).

### 3. Động cơ RAG (Retrieval-Augmented Generation)
* Tích hợp **pgvector** trong PostgreSQL để tính toán độ tương đồng giữa câu hỏi của người dùng và văn bản mô tả cơ sở bằng khoảng cách Cosine (`<=>`).
* Sử dụng mô hình **`gemini-embedding-001`** (giới hạn `768` chiều) kết hợp thế hệ ngôn ngữ lớn **`gemini-2.5-flash`** của Google để trả về câu trả lời tự nhiên, đáng tin cậy.

---

## 📂 Cấu trúc thư mục Monorepo

```text
An-Lao/
├── An-Lao-FE/               # NEXT.JS 15 + REACT 19 FRONTEND
│   ├── app/                 # App Router (pages, layouts, API routes)
│   │   ├── admin/           # Trang quản trị cơ sở
│   │   ├── chat/            # Giao diện Trợ lý ảo AI
│   │   ├── facility/[id]/   # Chi tiết cơ sở & Đặt lịch
│   │   └── login/register/  # Xác thực người dùng
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks (useAuth, useMobile, ...)
│   ├── lib/                 # Tiện ích bổ trợ (axios/fetch config, utils)
│   └── package.json
│
├── An-Lao-BE/               # SPRING BOOT 3 BACKEND SERVICE
│   ├── src/main/java/com/anlao/anlao_api/
│   │   ├── component/       # VectorSeeder nạp vector tự động
│   │   ├── config/          # Cấu hình CORS, Security, Swagger
│   │   ├── controller/      # API Endpoints (Auth, Facility, Booking, Chat)
│   │   ├── entity/          # JPA Entities (Facility, FacilityChunk, User, Review)
│   │   ├── repository/      # JPA & Native pgvector queries
│   │   └── service/         # Business Logic & Gemini API integration
│   ├── src/main/resources/
│   │   ├── db/migration/    # DDL & DML SQL scripts
│   │   └── application-dev.yml # Cấu hình dev (kết nối DB, Gemini API key)
│   └── pom.xml
│
└── .gitignore               # File ignore ở cấp độ Monorepo gốc
```

---

## ⚙️ Hướng dẫn cài đặt & Chạy ứng dụng

### Yêu cầu hệ thống trước khi bắt đầu:
* **Java SDK 17+**
* **Node.js 18+** & **npm**
* **PostgreSQL 15+** (Đã cài đặt extension **pgvector**)
* **Gemini API Key** (Lấy miễn phí tại [Google AI Studio](https://aistudio.google.com/))

---

### Bước 1: Thiết lập Cơ sở dữ liệu (PostgreSQL)
1. Đăng nhập vào PostgreSQL và tạo một database mới:
   ```sql
   CREATE DATABASE anlaodb;
   ```
2. Cài đặt extension **pgvector**:
   ```sql
   \c anlaodb;
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

---

### Bước 2: Cấu hình và chạy Backend (`An-Lao-BE`)
1. Di chuyển vào thư mục backend:
   ```bash
   cd An-Lao-BE
   ```
2. Cấu hình file `src/main/resources/application-dev.yml`. Cập nhật thông tin kết nối Database và điền **Gemini API Key** của bạn:
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5433/anlaodb # Thay đổi cổng/tên DB tương ứng
       username: postgres
       password: your_db_password

   gemini:
     api-key: AIzaSy... # Điền API Key của bạn tại đây
   ```
3. Chạy lệnh Maven để biên dịch dự án:
   ```bash
   .\mvnw.cmd compile
   ```
4. Khởi động ứng dụng Spring Boot:
   ```bash
   .\mvnw.cmd spring-boot:run
   ```
   *API Server mặc định sẽ khởi chạy tại cổng:* `http://localhost:8080`
   *Tài liệu Swagger API có thể xem tại:* `http://localhost:8080/swagger-ui/index.html`

---

### Bước 3: Cấu hình và chạy Frontend (`An-Lao-FE`)
1. Di chuyển vào thư mục frontend:
   ```bash
   cd ../An-Lao-FE
   ```
2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```
3. Tạo file cấu hình môi trường `.env.local` ở thư mục `An-Lao-FE`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```
4. Chạy Frontend ở chế độ Development:
   ```bash
   npm run dev
   ```
   *Giao diện người dùng sẽ chạy tại địa chỉ:* `http://localhost:3000`

---

## 🛠️ Quy tắc phát triển đóng góp (Monorepo Rules)

1. **Không hardcode thông tin nhạy cảm:** Các mã khóa API, mật khẩu Database bắt buộc phải khai báo qua biến môi trường hoặc file config được bỏ qua trong `.gitignore`.
2. **Quy tắc TypeScript nghiêm ngặt:** Tuyệt đối không sử dụng kiểu dữ liệu `any`. Định nghĩa Interface/Type rõ ràng cho mọi request/response DTO.
3. **Quy tắc Next.js 15:** 
   * Sử dụng App Router (`/app`).
   * Giữ React Server Components (RSC) làm mặc định để tối ưu hóa SEO. Chỉ khai báo `"use client"` khi thực sự cần thiết (sử dụng State, Effects hoặc Event listener).
4. **pgvector & RAG:** Khoảng cách lọc vector tìm kiếm ngữ nghĩa được cài đặt thông số Cosine Distance `<=> < 0.45` để cân bằng giữa độ bao phủ dữ liệu và tính liên quan của câu trả lời.

---

<div align="center">

**AnLao.vn** — Kết nối gia đình với sự chăm sóc tận tâm nhất 💚

</div>
