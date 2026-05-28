# Hướng dẫn đóng góp — AnLao.vn Backend

Tài liệu này quy định các tiêu chuẩn bắt buộc áp dụng trong toàn bộ quá trình phát triển Backend Spring Boot của dự án **AnLao.vn**. Mọi thành viên cần đọc kỹ và tuân thủ trước khi tạo Pull Request.

---

## Mục lục

1. [Quy tắc Git](#1-quy-tắc-git)
2. [Java Naming Convention](#2-java-naming-convention)
3. [Cấu trúc DTO & Entity](#3-cấu-trúc-dto--entity)
4. [Xử lý lỗi tập trung](#4-xử-lý-lỗi-tập-trung)

---

## 1. Quy tắc Git

### 1.1 Đặt tên Branch

Tên branch phải theo format: `<type>/<scope-mô-tả-ngắn-gọn>` (sử dụng **kebab-case**, **tiếng Anh**).

| Prefix | Mục đích | Ví dụ |
|---|---|---|
| `feat/` | Tính năng mới | `feat/booking-api` |
| `fix/` | Sửa bug | `fix/jwt-token-expiry` |
| `refactor/` | Cải tổ code, không thêm tính năng | `refactor/facility-service` |
| `docs/` | Cập nhật tài liệu | `docs/api-swagger` |
| `test/` | Thêm/sửa unit test | `test/booking-service` |
| `chore/` | Cấu hình, dependency, CI/CD | `chore/update-spring-boot-3.3` |

> ❌ **Không dùng:** `my-branch`, `test123`, `nguyen-fix`, `newfeature`

---

### 1.2 Commit Message

Áp dụng chuẩn **[Conventional Commits](https://www.conventionalcommits.org/)**.

**Format:**
```
<type>(<scope>): <mô tả ngắn gọn, dùng tiếng Anh, không viết hoa chữ đầu>

[Body tùy chọn: giải thích lý do thay đổi, không phải mô tả "cái gì"]

[Footer tùy chọn: BREAKING CHANGE, Fixes #issue-number]
```

**Các loại `type` hợp lệ:**

| Type | Ý nghĩa |
|---|---|
| `feat` | Thêm tính năng mới |
| `fix` | Sửa lỗi |
| `refactor` | Tái cấu trúc code |
| `docs` | Cập nhật tài liệu |
| `test` | Thêm/cập nhật test |
| `perf` | Cải thiện hiệu năng |
| `chore` | Cập nhật cấu hình, build tool |
| `ci` | Thay đổi CI/CD pipeline |

**Ví dụ commit hợp lệ:**
```
feat(booking): add POST /api/v1/bookings endpoint

Implement booking creation with slot availability check.
Returns 409 Conflict if the requested slot is already taken.

Fixes #42
```

```
fix(auth): correct JWT expiration claim to use seconds not milliseconds
```

```
refactor(facility): extract search logic from controller into FacilityQueryService
```

> ❌ **Không dùng:**
> - `"fix bug"`
> - `"update code"`
> - `"Nguyễn sửa lỗi đăng nhập"`
> - `"WIP"`

---

### 1.3 Quy trình Pull Request

- Mỗi PR chỉ giải quyết **một mục tiêu duy nhất** (một feature hoặc một bug).
- **Bắt buộc** phải có ít nhất **1 reviewer** approve trước khi merge vào `develop`.
- Không được self-merge PR của chính mình vào nhánh `main` hoặc `develop`.
- Branch `main` chỉ nhận merge từ `develop` qua PR sau khi release.

---

## 2. Java Naming Convention

Áp dụng theo [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html) với một số quy định bổ sung.

### 2.1 Classes & Interfaces

Sử dụng **`PascalCase`**. Tên phải rõ ràng, thể hiện đúng vai trò trong hệ thống.

| Loại | Convention | Ví dụ |
|---|---|---|
| Entity (JPA) | `<Domain>` | `Facility`, `Booking`, `User` |
| Repository | `<Domain>Repository` | `FacilityRepository` |
| Service (Interface) | `<Domain>Service` | `BookingService` |
| Service (Impl) | `<Domain>ServiceImpl` | `BookingServiceImpl` |
| Controller | `<Domain>Controller` | `FacilityController` |
| DTO (Request) | `<Domain>Request` | `CreateBookingRequest` |
| DTO (Response) | `<Domain>Response` | `BookingResponse` |
| Mapper (MapStruct) | `<Domain>Mapper` | `FacilityMapper` |
| Exception | `<Mô tả>Exception` | `ResourceNotFoundException`, `BookingConflictException` |
| Enum | `PascalCase` | `BookingStatus`, `UserRole` |

```java
// ✅ Đúng
public class FacilityController { ... }
public interface BookingService { ... }
public class BookingServiceImpl implements BookingService { ... }

// ❌ Sai
public class facilityController { ... }
public class Booking_Service_Impl { ... }
public class BSImpl { ... }
```

---

### 2.2 Methods

Sử dụng **`camelCase`**. Tên method phải bắt đầu bằng **động từ** mô tả hành động.

```java
// ✅ Đúng
public BookingResponse createBooking(CreateBookingRequest request) { ... }
public Page<FacilityResponse> searchFacilities(FacilityFilterRequest filter, Pageable pageable) { ... }
public void cancelBooking(Long bookingId) { ... }
private boolean isSlotAvailable(Long facilityId, LocalDate date) { ... }

// ❌ Sai
public BookingResponse booking(CreateBookingRequest request) { ... }   // thiếu động từ
public Page<FacilityResponse> Facilities(Pageable pageable) { ... }    // PascalCase
```

---

### 2.3 Variables & Constants

```java
// Biến thường — camelCase
private final BookingRepository bookingRepository;
String facilityName;
int availableSlots;

// Hằng số — SCREAMING_SNAKE_CASE
public static final int MAX_BOOKING_PER_DAY = 5;
public static final String DEFAULT_PAGE_SIZE = "10";

// ❌ Sai
String FacilityName;          // PascalCase cho biến
int available_slots;          // snake_case
final int maxBooking = 5;     // hằng số không dùng SCREAMING_SNAKE_CASE
```

---

### 2.4 Packages

Sử dụng **chữ thường**, **số nhiều** cho nhóm loại, không dùng dấu gạch dưới:

```
com.anlao.backend
├── config
├── controller
├── dto
│   ├── request
│   └── response
├── entity
├── exception
├── mapper
├── repository
├── security
└── service
    └── impl
```

---

## 3. Cấu trúc DTO & Entity

### 3.1 Nguyên tắc bắt buộc

> **Entity và DTO PHẢI được tách biệt hoàn toàn. Tuyệt đối không trả Entity trực tiếp từ Controller ra ngoài.**

**Lý do:**
- Entity thường chứa dữ liệu nhạy cảm (hashed password, internal flags).
- Gây coupling chặt giữa cấu trúc DB và giao diện API.
- Khi cấu trúc bảng thay đổi sẽ ảnh hưởng trực tiếp đến API Contract.

---

### 3.2 Cấu trúc Entity (JPA)

```java
@Entity
@Table(name = "facilities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Facility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(name = "monthly_fee")
    private Long monthlyFee;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "facility", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> bookings = new ArrayList<>();
}
```

**Quy định Entity:**
- Bắt buộc dùng `@Builder` và Lombok (`@Getter`, `@Setter`, `@NoArgsConstructor`, `@AllArgsConstructor`).
- Sử dụng `@CreationTimestamp` / `@UpdateTimestamp` cho các trường audit.
- Không dùng `FetchType.EAGER` ở các quan hệ `@OneToMany` để tránh N+1 query.
- Không đặt annotation `@JsonIgnore` lên Entity — đây là mùi code (code smell), thay vào đó hãy dùng DTO.

---

### 3.3 Cấu trúc DTO

**Request DTO** — Nhận dữ liệu từ Frontend:
```java
// dto/request/CreateBookingRequest.java
@Getter
@Setter
@NoArgsConstructor
public class CreateBookingRequest {

    @NotNull(message = "Facility ID không được để trống")
    private Long facilityId;

    @NotNull(message = "Ngày hẹn không được để trống")
    @FutureOrPresent(message = "Ngày hẹn phải từ hôm nay trở đi")
    private LocalDate visitDate;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "^(0|\\+84)[0-9]{9}$", message = "Số điện thoại không hợp lệ")
    private String contactPhone;
}
```

**Response DTO** — Trả dữ liệu về Frontend:
```java
// dto/response/BookingResponse.java
@Getter
@Builder
public class BookingResponse {
    private Long id;
    private Long facilityId;
    private String facilityName;
    private LocalDate visitDate;
    private String contactPhone;
    private BookingStatus status;
    private LocalDateTime createdAt;
}
```

---

### 3.4 MapStruct để ánh xạ Entity ↔ DTO

**Khuyến nghị sử dụng [MapStruct](https://mapstruct.org/)** để tự động sinh code chuyển đổi, giúp loại bỏ boilerplate và giảm lỗi thủ công.

**Thêm dependency (Maven):**
```xml
<dependency>
    <groupId>org.mapstruct</groupId>
    <artifactId>mapstruct</artifactId>
    <version>1.5.5.Final</version>
</dependency>
<dependency>
    <groupId>org.mapstruct</groupId>
    <artifactId>mapstruct-processor</artifactId>
    <version>1.5.5.Final</version>
    <scope>provided</scope>
</dependency>
```

**Ví dụ Mapper:**
```java
// mapper/BookingMapper.java
@Mapper(componentModel = "spring")
public interface BookingMapper {

    // Ánh xạ từ Request DTO → Entity
    Booking toEntity(CreateBookingRequest request);

    // Ánh xạ từ Entity → Response DTO
    // Khi tên field khác nhau, dùng @Mapping
    @Mapping(source = "facility.id",   target = "facilityId")
    @Mapping(source = "facility.name", target = "facilityName")
    BookingResponse toResponse(Booking booking);

    // Ánh xạ danh sách
    List<BookingResponse> toResponseList(List<Booking> bookings);
}
```

**Sử dụng trong Service:**
```java
@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;

    @Override
    public BookingResponse createBooking(CreateBookingRequest request) {
        Booking booking = bookingMapper.toEntity(request);
        // ... business logic
        Booking saved = bookingRepository.save(booking);
        return bookingMapper.toResponse(saved);
    }
}
```

> ❌ **Không làm thủ công:**
> ```java
> // Tránh pattern này — dễ quên field, khó bảo trì
> BookingResponse response = new BookingResponse();
> response.setId(booking.getId());
> response.setFacilityId(booking.getFacility().getId());
> // ...
> ```

---

## 4. Xử lý lỗi tập trung

### 4.1 Nguyên tắc

Toàn bộ exception trong hệ thống **phải được xử lý tập trung** tại một `@RestControllerAdvice`. Controller và Service **không được** tự ý return mã lỗi hay message trực tiếp — chỉ được **throw exception**.

---

### 4.2 Định nghĩa Error Response thống nhất

Mọi lỗi trả về Frontend đều theo cùng một format JSON:

```java
// exception/ErrorResponse.java
@Getter
@Builder
public class ErrorResponse {
    private int status;
    private String error;
    private String message;
    private String path;
    private LocalDateTime timestamp;
}
```

**Ví dụ response lỗi:**
```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Không tìm thấy cơ sở dưỡng lão với ID: 99",
  "path": "/api/v1/facilities/99",
  "timestamp": "2025-04-26T10:30:00"
}
```

---

### 4.3 Định nghĩa Custom Exceptions

```java
// exception/ResourceNotFoundException.java
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resourceName, Long id) {
        super("Không tìm thấy " + resourceName + " với ID: " + id);
    }
}

// exception/BookingConflictException.java
@ResponseStatus(HttpStatus.CONFLICT)
public class BookingConflictException extends RuntimeException {
    public BookingConflictException(LocalDate date) {
        super("Khung giờ ngày " + date + " đã được đặt. Vui lòng chọn ngày khác.");
    }
}

// exception/UnauthorizedAccessException.java
@ResponseStatus(HttpStatus.FORBIDDEN)
public class UnauthorizedAccessException extends RuntimeException {
    public UnauthorizedAccessException() {
        super("Bạn không có quyền thực hiện hành động này.");
    }
}
```

---

### 4.4 Global Exception Handler (`@RestControllerAdvice`)

```java
// exception/GlobalExceptionHandler.java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // --- 404: Resource không tồn tại ---
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            ResourceNotFoundException ex, HttpServletRequest request) {
        log.warn("Resource not found: {}", ex.getMessage());
        return buildError(HttpStatus.NOT_FOUND, ex.getMessage(), request.getRequestURI());
    }

    // --- 409: Xung đột dữ liệu (vd: slot đã đặt) ---
    @ExceptionHandler(BookingConflictException.class)
    public ResponseEntity<ErrorResponse> handleConflict(
            BookingConflictException ex, HttpServletRequest request) {
        return buildError(HttpStatus.CONFLICT, ex.getMessage(), request.getRequestURI());
    }

    // --- 400: Validation thất bại từ @Valid ---
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(
            MethodArgumentNotValidException ex, HttpServletRequest request) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return buildError(HttpStatus.BAD_REQUEST, message, request.getRequestURI());
    }

    // --- 403: Không có quyền ---
    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<ErrorResponse> handleForbidden(
            UnauthorizedAccessException ex, HttpServletRequest request) {
        return buildError(HttpStatus.FORBIDDEN, ex.getMessage(), request.getRequestURI());
    }

    // --- 500: Lỗi hệ thống không lường trước ---
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(
            Exception ex, HttpServletRequest request) {
        log.error("Unexpected error at {}: {}", request.getRequestURI(), ex.getMessage(), ex);
        return buildError(HttpStatus.INTERNAL_SERVER_ERROR,
                "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.", request.getRequestURI());
    }

    // --- Helper method ---
    private ResponseEntity<ErrorResponse> buildError(
            HttpStatus status, String message, String path) {
        ErrorResponse body = ErrorResponse.builder()
                .status(status.value())
                .error(status.getReasonPhrase())
                .message(message)
                .path(path)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(status).body(body);
    }
}
```

---

### 4.5 Cách throw exception từ Service

```java
// ✅ Đúng — throw exception, để GlobalExceptionHandler xử lý
@Override
public FacilityResponse getFacilityById(Long id) {
    return facilityRepository.findById(id)
            .map(facilityMapper::toResponse)
            .orElseThrow(() -> new ResourceNotFoundException("cơ sở dưỡng lão", id));
}

// ❌ Sai — không tự xây dựng response lỗi trong Service hoặc Controller
@Override
public ResponseEntity<?> getFacilityById(Long id) {
    Optional<Facility> facility = facilityRepository.findById(id);
    if (facility.isEmpty()) {
        return ResponseEntity.status(404).body("Not found"); // TRÁNH LÀM THẾ NÀY
    }
    return ResponseEntity.ok(facility.get()); // TRÁNH TRẢ ENTITY TRỰC TIẾP
}
```

---

## Checklist trước khi tạo Pull Request

Xem lại các điểm sau trước khi submit PR:

- [ ] Branch đặt tên đúng convention (`feat/`, `fix/`, ...)
- [ ] Tất cả commit message theo chuẩn Conventional Commits
- [ ] Không có Entity nào được trả trực tiếp từ Controller
- [ ] Các DTO Request có đầy đủ annotation validation (`@NotNull`, `@NotBlank`, ...)
- [ ] Dùng MapStruct để ánh xạ Entity ↔ DTO (không mapping thủ công)
- [ ] Mọi lỗi nghiệp vụ đều được throw qua Custom Exception
- [ ] Không có block `catch (Exception e)` bắt lỗi rỗng (swallowing exception)
- [ ] Code đã được format theo Google Java Style (có thể dùng IntelliJ built-in formatter)
- [ ] Đã viết unit test cho Service layer của tính năng mới

---

<div align="center">

*Tài liệu này được duy trì bởi đội Backend — AnLao.vn* 💚

</div>
