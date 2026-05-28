package com.anlao.anlao_api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {
    private Long id;
    private Long facilityId;
    private String facilityName;
    private String contactName;
    private String contactPhone;
    private String relativeType;
    private List<String> healthStatuses;
    private LocalDate visitDate;
    private String visitTime;
    private String note;
    private String status;
    private String adminNote;
    private String cancelReason;
    private Boolean hasReviewed;
    private LocalDateTime createdAt;
}
