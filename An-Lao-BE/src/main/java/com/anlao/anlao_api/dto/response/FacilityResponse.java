package com.anlao.anlao_api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FacilityResponse {
    private Long id;
    private String name;
    private String district;
    private BigDecimal rating;
    private Integer reviewCount;
    private BigDecimal priceMin;
    private BigDecimal priceMax;
    private String priceUnit;
    private String imageUrl;
    private Boolean isVerified;
    private Boolean isWarning;
    private List<String> tags;
}
