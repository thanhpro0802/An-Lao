package com.anlao.anlao_api.dto.request;

import jakarta.validation.constraints.NotBlank;
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
public class CreateFacilityRequest {
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Address is required")
    private String address;
    
    @NotBlank(message = "District is required")
    private String district;
    
    private String description;
    private BigDecimal priceMin;
    private BigDecimal priceMax;
    private String priceUnit;
    private String priceIncludes;
    private String priceExcludes;
    private String imageUrl;
    private List<String> images;
    private List<String> tags;
}
