package com.anlao.anlao_api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateFacilityRequest {
    private String name;
    private String address;
    private String district;
    private String description;
    private java.math.BigDecimal priceMin;
    private java.math.BigDecimal priceMax;
    private String priceUnit;
    private String priceIncludes;
    private String priceExcludes;
    private String imageUrl;
    private java.util.List<String> images;
    private java.util.List<String> tags;
    private Boolean isVerified;
    private Boolean isWarning;
}
