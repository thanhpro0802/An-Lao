# AnLao.vn Backend — API Specifications

Tài liệu này định nghĩa danh sách các RESTful API mà Frontend yêu cầu Backend cung cấp, dựa trên thiết kế giao diện thực tế (UI) của nền tảng AnLao.vn (các trang `/search`, `/facility/[id]`, và `/appointments`).

> **Lưu ý:** Tất cả các response đều tuân theo format chuẩn `ApiResponse<T>` (bao gồm `status`, `message`, `data`) như quy định trong `CONTEXT.md`. Dưới đây chỉ mô tả phần `data` hoặc toàn bộ JSON mẫu.

---

## 1. Cơ sở dưỡng lão (Facilities)

### 1.1. Tìm kiếm và Lọc cơ sở (Search)
- **Endpoint:** `GET /api/v1/facilities`
- **Mô tả:** Lấy danh sách cơ sở dưỡng lão dựa trên từ khóa tìm kiếm và các bộ lọc. Phục vụ trang `/search`.
- **Query Parameters (Tuỳ chọn):**
  - `query` (String): Từ khóa tìm kiếm tên cơ sở.
  - `district` (String): Quận/Huyện (vd: `cau-giay`).
  - `maxPrice` (Long): Giá tối đa (vd: `10000000`).
  - `features` (List<String>): Lọc theo tiện ích (vd: `BAN_TRU`, `TAI_BIEN`).
- **JSON Response mẫu:**

```json
{
  "status": 200,
  "message": "Thành công",
  "data": {
    "content": [
      {
        "id": 1,
        "name": "Lotus Care",
        "district": "Quận Cầu Giấy",
        "rating": 5.0,
        "reviewCount": 89,
        "priceMin": 15,
        "priceMax": 25,
        "priceUnit": "triệu/tháng",
        "imageUrl": "https://lh3.googleusercontent.com/...",
        "isVerified": true,
        "isWarning": false,
        "tags": ["Y TẾ 24/7", "BÁN TRÚ", "CAMERA"]
      },
      {
        "id": 2,
        "name": "Trung tâm dưỡng lão Bình Minh",
        "district": "Quận Hà Đông",
        "rating": 3.5,
        "reviewCount": 45,
        "priceMin": 5,
        "priceMax": 9,
        "priceUnit": "triệu/tháng",
        "imageUrl": "https://lh3.googleusercontent.com/...",
        "isVerified": false,
        "isWarning": true,
        "tags": []
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 3,
    "totalPages": 1
  }
}
```

### 1.2. Chi tiết cơ sở dưỡng lão
- **Endpoint:** `GET /api/v1/facilities/{id}`
- **Mô tả:** Lấy toàn bộ thông tin chi tiết của một cơ sở dưỡng lão để hiển thị trên trang `/facility/[id]`.
- **JSON Response mẫu:**

```json
{
  "status": 200,
  "message": "Thành công",
  "data": {
    "id": 1,
    "name": "Lotus Care",
    "district": "Quận Cầu Giấy",
    "address": "123 Đường Cầu Giấy, Hà Nội",
    "rating": 5.0,
    "reviewCount": 89,
    "isVerified": true,
    "images": [
      "https://lh3.googleusercontent.com/...",
      "https://lh3.googleusercontent.com/..."
    ],
    "tags": ["Y TẾ 24/7", "BÁN TRÚ", "CAMERA", "XE ĐƯA ĐÓN", "NHẬN TAI BIẾN"],
    "pricing": {
      "min": 15,
      "max": 25,
      "unit": "triệu/tháng",
      "includes": "Ăn uống, chăm sóc cơ bản, điện nước sinh hoạt.",
      "excludes": "Thuốc theo đơn, bỉm, vật tư y tế chuyên sâu."
    },
    "description": "Lotus Care là hệ thống chăm sóc người cao tuổi cao cấp được thành lập từ năm 2018. Với quy mô hơn 100 giường...",
    "topReviews": [
      {
        "id": 101,
        "reviewerName": "Chị N.T.H",
        "reviewerRole": "Con gái của cụ đang ở đây",
        "rating": 5,
        "content": "Gia đình rất yên tâm khi gửi bà tại đây. Các điều dưỡng cực kỳ nhẹ nhàng..."
      }
    ]
  }
}
```

---

## 2. Đặt lịch (Appointments / Bookings)

### 2.1. Tạo lịch hẹn tham quan
- **Endpoint:** `POST /api/v1/bookings`
- **Mô tả:** Gửi form yêu cầu đặt lịch tham quan cơ sở (từ trang `/facility/[id]/book`). Yêu cầu xác thực (Token).
- **Request Body (Gửi từ UI):**

```json
{
  "facilityId": 1,
  "contactName": "Nguyễn Văn A",
  "contactPhone": "0912345678",
  "relativeType": "MOTHER",      // Phụ huynh/Người thân
  "healthStatuses": ["Tự đi lại được", "Sau tai biến"], // Dạng Array string hoặc Enum
  "visitDate": "2026-05-20",
  "visitTime": "MORNING",        // MORNING (8-11h) hoặc AFTERNOON (14-17h)
  "note": "Mẹ tôi cần phòng riêng, hỏi thêm về gói bán trú"
}
```
- **Response:** Trả về đối tượng lịch hẹn vừa tạo với status `200` (hoặc `201 Created`).

### 2.2. Lấy danh sách lịch hẹn của tôi
- **Endpoint:** `GET /api/v1/bookings/me`
- **Mô tả:** Lấy danh sách lịch hẹn của user đang đăng nhập để hiển thị trên trang `/appointments`. Hệ thống tự sắp xếp và lọc theo 3 tab: Sắp diễn ra, Đã hoàn thành, Đã hủy. Yêu cầu xác thực.
- **JSON Response mẫu:**

```json
{
  "status": 200,
  "message": "Thành công",
  "data": [
    {
      "id": 501,
      "facility": {
        "id": 1,
        "name": "Lotus Care",
        "district": "Quận Cầu Giấy",
        "imageUrl": "https://lh3.googleusercontent.com/..."
      },
      "status": "CONFIRMED",      // PENDING, CONFIRMED, COMPLETED, CANCELLED
      "visitDate": "2026-05-20",
      "visitTime": "Sáng (8–11h)",
      "contactName": "Nguyễn Văn A",
      "contactPhone": "0912 345 678",
      "healthStatusSummary": "Sau tai biến",
      "adminNote": "Nhớ hỏi về phụ phí bỉm, thuốc khi đến", // Ghi chú từ admin/hệ thống
      "cancelReason": null,
      "hasReviewed": false
    },
    {
      "id": 490,
      "facility": {
        "id": 2,
        "name": "Viện dưỡng lão Thiên Đức",
        "district": "Bắc Từ Liêm",
        "imageUrl": "https://lh3.googleusercontent.com/..."
      },
      "status": "COMPLETED",
      "visitDate": "2026-05-10",
      "visitTime": "Chiều (14-17h)",
      "contactName": "Nguyễn Văn A",
      "contactPhone": "0912 345 678",
      "healthStatusSummary": "Tự đi lại được",
      "adminNote": null,
      "cancelReason": null,
      "hasReviewed": false           // UI sẽ hiển thị nút "Để lại đánh giá" nếu false
    },
    {
      "id": 485,
      "facility": {
        "id": 3,
        "name": "Trung tâm Điều dưỡng Ánh Dương",
        "district": "Quận Đống Đa",
        "imageUrl": "https://lh3.googleusercontent.com/..."
      },
      "status": "CANCELLED",
      "visitDate": "2026-05-08",
      "visitTime": "Sáng (8-11h)",
      "contactName": "Nguyễn Văn A",
      "contactPhone": "0912 345 678",
      "healthStatusSummary": "Tự đi lại được",
      "adminNote": null,
      "cancelReason": "Bạn đã hủy", // UI hiển thị "Lý do: Bạn đã hủy"
      "hasReviewed": false
    }
  ]
}
```

### 2.3. Hủy lịch hẹn
- **Endpoint:** `PATCH /api/v1/bookings/{id}/cancel`
- **Mô tả:** Chức năng cho phép người dùng tự hủy lịch hẹn (khi nhấn nút "Hủy lịch" trên UI).
- **Request Body (Gửi từ UI):**
```json
{
  "reason": "Thay đổi kế hoạch gia đình"
}
```
- **Response:** Trả về message thành công.
