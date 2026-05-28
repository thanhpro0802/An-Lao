# AnLao.vn Backend — AI Developer Context

Chào AI (Cursor / GitHub Copilot / LLM agent), đây là tệp ngữ cảnh (context) dành riêng cho bạn khi hỗ trợ viết code cho dự án **AnLao.vn Backend**. Hãy đọc kỹ và tuân thủ tuyệt đối các nguyên tắc dưới đây trong quá trình phân tích, đề xuất và sinh mã nguồn.

---

## 1. Công nghệ & Framework
- **Ngôn ngữ:** Java 17 (hoặc mới hơn).
- **Framework chính:** Spring Boot 3.x.
- **Boilerplate:** **Bắt buộc** sử dụng **Lombok** (`@Getter`, `@Setter`, `@Builder`, `@NoArgsConstructor`, `@AllArgsConstructor`, `@RequiredArgsConstructor`, `@Slf4j`) để giảm thiểu code thừa. Tuyệt đối không tự viết getter/setter/constructor thủ công trừ khi có logic tùy biến đặc biệt.

## 2. Database & ORM
- **Database:** PostgreSQL.
- **ORM:** Spring Data JPA / Hibernate.
- **Ngăn chặn lỗi N+1 Query (Cực kỳ quan trọng):**
  - Không sử dụng `FetchType.EAGER` cho các quan hệ (đặc biệt là `@OneToMany` hoặc `@ManyToMany`). Mặc định phải dùng `LAZY`.
  - Khi cần truy vấn dữ liệu có liên kết (ví dụ: lấy `Facility` kèm theo `Reviews`), bắt buộc sử dụng `EntityGraph`, `JOIN FETCH` trong câu lệnh JPQL, hoặc sử dụng Projections để tránh N+1.

## 3. Thiết kế REST API chuẩn
- Controller chỉ định tuyến, gọi Service và trả về kết quả. Không chứa business logic.
- **ApiResponse Wrapper:** TẤT CẢ các API response (cả thành công lẫn thất bại) phải được bọc trong class `ApiResponse<T>` để Frontend dễ dàng đồng bộ xử lý.

  **Khuôn mẫu bắt buộc của ApiResponse:**
  ```java
  @Getter
  @Builder
  public class ApiResponse<T> {
      private int status;      // HTTP Status Code (vd: 200, 400, 404, 500)
      private String message;  // Thông báo mô tả (vd: "Thành công", "Không tìm thấy dữ liệu")
      private T data;          // Payload dữ liệu thực tế (có thể null nếu có lỗi)
  }
  ```
- **Xử lý ngoại lệ (Exception Handling):** 
  - Không dùng `try-catch` lồng ghép trả về response lỗi trực tiếp trong Controller/Service.
  - Phải `throw` các Custom Exception (vd: `ResourceNotFoundException`) và để một `@RestControllerAdvice` (GlobalExceptionHandler) bắt lại, định dạng thành `ApiResponse<T>` với status lỗi tương ứng.

## 4. RAG Logic (AI Tư vấn) — Chống Ảo giác (Hallucination)
Nền tảng này có hệ thống AI Chatbot hỗ trợ tư vấn chọn viện dưỡng lão dựa trên dữ liệu RAG (Retrieval-Augmented Generation).
- **Giới hạn Context Tuyệt Đối:** Khi sinh code liên quan đến Prompt Engineering hoặc tương tác LLM, bạn **phải luôn** chèn logic giới hạn câu trả lời của AI trong phạm vi thông tin của **14 cơ sở dưỡng lão** có trong hệ thống.
- **System Prompt Ràng buộc:** Code sinh Prompt luôn phải có kèm chỉ thị hệ thống dạng:
  *"Chỉ trả lời dựa trên thông tin bối cảnh (context) được cung cấp. Nếu thông tin người dùng hỏi không có trong bối cảnh, hãy trả lời từ chối khéo léo (vd: 'Tôi hiện chưa có thông tin về vấn đề này'). TUYỆT ĐỐI không được bịa đặt (hallucinate) thông tin về giá cả, dịch vụ, hay đưa ra lời khuyên y tế."*

## 5. Bảo mật & Logging (Security Ideas)
- **Tính đóng gói (Encapsulation):** Đảm bảo các thuộc tính lớp (class fields) luôn là `private`. Chỉ mở quyền truy cập cần thiết qua public methods hoặc DTO. Không lộ các field nhạy cảm của Entity ra ngoài API.
- **Bảo mật Log (Zero-Leakage):** Khi sinh code xử lý log (sử dụng `@Slf4j`), **TUYỆT ĐỐI KHÔNG** ghi ra log các thông tin nhạy cảm sau:
  - Mật khẩu người dùng (plaintext hay hash).
  - Token bảo mật (JWT, Session ID).
  - API Keys hoặc Secrets (Gemini API Key, DB Password, JWT Secret).
  - Thông tin định danh cá nhân nhạy cảm (PII).
- Mọi giá trị cấu hình nhạy cảm phải được gọi qua `@Value` hoặc `Environment` từ biến môi trường, tuyệt đối không hardcode trong source code.

---
> **Lưu ý cuối cùng:** Code do bạn sinh ra phải luôn tuân thủ nguyên tắc Clean Code, SOLID và viết bằng tiếng Anh đối với tên biến/hàm/class (comment có thể dùng tiếng Việt). Hãy là một chuyên gia Spring Boot nghiêm ngặt với các tiêu chuẩn này!
