<div align="center">

# 🏥 AnLao.vn — Backend Service

**Nền tảng đặt lịch viện dưỡng lão thông minh**

[![Java](https://img.shields.io/badge/Java-17+-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)](https://maven.apache.org/)

</div>

---

## 📌 Giới thiệu

Repository này chứa toàn bộ **Backend** của nền tảng **AnLao.vn** — hệ thống đặt lịch tham quan và đăng ký dịch vụ cho 14 cơ sở viện dưỡng lão tại Việt Nam.

Backend đảm nhận hai vai trò chính:

| Vai trò | Mô tả |
|---|---|
| **RESTful API** | Cung cấp các endpoint cho Frontend (Next.js/React) thực hiện đặt lịch, xác thực người dùng, quản lý thông báo, hồ sơ, v.v. |
| **RAG Engine** | Xử lý pipeline Retrieval-Augmented Generation, tích hợp dữ liệu của 14 cơ sở dưỡng lão để trả lời câu hỏi thông minh, hỗ trợ tư vấn chọn cơ sở phù hợp. |

### Kiến trúc tổng quan

```
Frontend (Next.js)  ──►  Spring Boot API  ──►  PostgreSQL
                              │
                              └──►  RAG Pipeline  ──►  Gemini / OpenAI API
                                        │
                                        └──►  Vector Store (pgvector / ChromaDB)
```

---

## ⚙️ Cấu hình môi trường

### 1. Sao chép file cấu hình mẫu

```bash
cp src/main/resources/application.example.yml src/main/resources/application.yml
```

> Hoặc dùng file `.env` nếu dự án cấu hình qua biến môi trường hệ thống.

---

### 2. Nội dung `application.yml`

```yaml
# ============================================================
#  AnLao Backend — Application Configuration
# ============================================================

server:
  port: 8080                        # Port mặc định của API server

spring:
  application:
    name: anlao-backend

  # ----------------------------------------------------------
  #  PostgreSQL Database
  # ----------------------------------------------------------
  datasource:
    url: jdbc:postgresql://localhost:5432/anlao_db
    username: YOUR_DB_USERNAME
    password: YOUR_DB_PASSWORD
    driver-class-name: org.postgresql.Driver

  jpa:
    hibernate:
      ddl-auto: update              # validate | update | create | create-drop
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true

  # ----------------------------------------------------------
  #  Connection Pool (HikariCP)
  # ----------------------------------------------------------
  hikari:
    maximum-pool-size: 10
    minimum-idle: 2
    connection-timeout: 30000

# ----------------------------------------------------------
#  RAG / AI Integration
# ----------------------------------------------------------
ai:
  gemini:
    api-key: YOUR_GEMINI_API_KEY    # Lấy tại: https://aistudio.google.com/apikey
    model: gemini-2.0-flash
  openai:                           # (Tuỳ chọn) nếu dùng OpenAI thay thế
    api-key: YOUR_OPENAI_API_KEY
    model: gpt-4o-mini

  rag:
    embedding-model: text-embedding-004
    chunk-size: 512
    chunk-overlap: 64
    top-k: 5                        # Số lượng document chunks trả về khi retrieval
    facilities-data-path: classpath:data/facilities/

# ----------------------------------------------------------
#  JWT Authentication
# ----------------------------------------------------------
jwt:
  secret: YOUR_JWT_SECRET_KEY_MIN_32_CHARS
  expiration-ms: 86400000           # 24 giờ

# ----------------------------------------------------------
#  CORS
# ----------------------------------------------------------
cors:
  allowed-origins:
    - http://localhost:3000          # Frontend dev
    - https://anlao.vn              # Frontend production

# ----------------------------------------------------------
#  Logging
# ----------------------------------------------------------
logging:
  level:
    root: INFO
    com.anlao: DEBUG
```

---

### 3. Biến môi trường (`.env`) — Tuỳ chọn thay thế

Nếu không muốn ghi trực tiếp thông tin nhạy cảm vào `application.yml`, có thể dùng file `.env` kết hợp với thư viện `dotenv-java`:

```env
# Database
DB_URL=jdbc:postgresql://localhost:5432/anlao_db
DB_USERNAME=postgres
DB_PASSWORD=your_password

# AI / RAG
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key   # Tuỳ chọn

# JWT
JWT_SECRET=your_super_secret_key_at_least_32_characters

# App
APP_ENV=development
APP_PORT=8080
```

> ⚠️ **Không commit `.env` hoặc `application.yml` chứa thông tin thật lên Git.** Đảm bảo đã thêm vào `.gitignore`.

---

## 🚀 Build & Chạy dự án

### Yêu cầu hệ thống

| Công cụ | Phiên bản tối thiểu |
|---|---|
| Java (JDK) | 17+ |
| Maven | 3.8+ |
| PostgreSQL | 14+ |
| Git | Bất kỳ |

---

### Sử dụng Maven

```bash
# 1. Clone repository
git clone https://github.com/your-org/anlao-backend.git
cd anlao-backend

# 2. Cấu hình application.yml (xem mục trên)

# 3. Build project (bỏ qua test)
mvn clean package -DskipTests

# 4. Chạy ứng dụng
java -jar target/anlao-backend-*.jar

# --- Hoặc chạy trực tiếp qua Maven ---
mvn spring-boot:run

# --- Chạy với profile cụ thể ---
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

---

### Sử dụng Gradle *(nếu dự án dùng Gradle)*

```bash
# Build
./gradlew clean build -x test

# Chạy
./gradlew bootRun

# Chạy với profile
./gradlew bootRun --args='--spring.profiles.active=dev'
```

---

### Chạy bằng Docker *(khuyến nghị cho production)*

```bash
# Build Docker image
docker build -t anlao-backend:latest .

# Chạy container
docker run -d \
  --name anlao-backend \
  -p 8080:8080 \
  --env-file .env \
  anlao-backend:latest

# Hoặc dùng Docker Compose (bao gồm PostgreSQL)
docker-compose up -d
```

---

## 🌐 Danh sách Port mặc định

| Service | Port | Mô tả |
|---|---|---|
| **Spring Boot API** | `8080` | REST API server chính |
| **PostgreSQL** | `5432` | Cơ sở dữ liệu quan hệ |
| **pgAdmin** *(tuỳ chọn)* | `5050` | Giao diện quản lý PostgreSQL |
| **ChromaDB** *(tuỳ chọn)* | `8000` | Vector store cho RAG pipeline |
| **Frontend (Next.js)** | `3000` | Frontend dev server *(repo riêng)* |

> Để thay đổi port API, chỉnh `server.port` trong `application.yml` hoặc biến môi trường `APP_PORT`.

---

## 📂 Cấu trúc dự án

```
anlao-backend/
├── src/
│   ├── main/
│   │   ├── java/com/anlao/
│   │   │   ├── config/          # Cấu hình Spring (Security, CORS, ...)
│   │   │   ├── controller/      # REST Controllers
│   │   │   ├── service/         # Business Logic
│   │   │   ├── repository/      # JPA Repositories
│   │   │   ├── model/           # Entity / Domain classes
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── rag/             # RAG pipeline (embeddings, retrieval)
│   │   │   └── AnLaoApplication.java
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       └── data/
│   │           └── facilities/  # Dữ liệu 14 cơ sở dưỡng lão (JSON/PDF)
│   └── test/
├── docker-compose.yml
├── Dockerfile
├── pom.xml                      # Maven build file
└── README.md
```

---

## 🔑 Các API Endpoint chính

| Method | Endpoint | Mô tả |
|---|---|---|
| `POST` | `/api/auth/register` | Đăng ký tài khoản |
| `POST` | `/api/auth/login` | Đăng nhập, nhận JWT |
| `GET` | `/api/facilities` | Danh sách 14 cơ sở dưỡng lão |
| `GET` | `/api/facilities/{id}` | Chi tiết một cơ sở |
| `POST` | `/api/appointments` | Đặt lịch hẹn |
| `GET` | `/api/appointments` | Lịch hẹn của người dùng |
| `GET` | `/api/notifications` | Thông báo người dùng |
| `POST` | `/api/rag/chat` | Chat với AI tư vấn (RAG) |
| `GET` | `/api/profile` | Thông tin hồ sơ người dùng |

> Tài liệu Swagger UI đầy đủ: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

## 🗄️ Khởi tạo Database

```sql
-- Tạo database
CREATE DATABASE anlao_db;

-- Bật extension pgvector (nếu dùng cho RAG)
CREATE EXTENSION IF NOT EXISTS vector;
```

Với `spring.jpa.hibernate.ddl-auto: update`, Spring Boot sẽ tự động tạo/cập nhật bảng khi khởi động.

---

## 🤝 Đóng góp

1. Fork repository
2. Tạo branch tính năng: `git checkout -b feature/ten-tinh-nang`
3. Commit: `git commit -m "feat: mô tả thay đổi"`
4. Push: `git push origin feature/ten-tinh-nang`
5. Tạo Pull Request

---

<div align="center">

**AnLao.vn** — Kết nối gia đình với sự chăm sóc tốt nhất 💚

</div>
