package com.anlao.anlao_api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequest {
    @NotNull(message = "Facility ID is required")
    private Long facilityId;

    @NotBlank(message = "Contact name is required")
    private String contactName;

    @NotBlank(message = "Contact phone is required")
    private String contactPhone;

    private String relativeType;
    private List<String> healthStatuses;

    @NotNull(message = "Visit date is required")
    private LocalDate visitDate;

    @NotBlank(message = "Visit time is required")
    private String visitTime;

    private String note;
}
