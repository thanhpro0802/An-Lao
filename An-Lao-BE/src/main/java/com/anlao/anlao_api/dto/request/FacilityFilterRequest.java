package com.anlao.anlao_api.dto.request;

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
public class FacilityFilterRequest {
    private String query;
    private String district;
    private BigDecimal maxPrice;
    private List<String> features;
}
