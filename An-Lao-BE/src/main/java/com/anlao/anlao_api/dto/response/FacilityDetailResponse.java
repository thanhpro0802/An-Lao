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
public class FacilityDetailResponse {
    private Long id;
    private String name;
    private String district;
    private String address;
    private BigDecimal rating;
    private Integer reviewCount;
    private Boolean isVerified;
    private Boolean isWarning;
    private String imageUrl;
    private List<String> images;
    private List<String> tags;
    private Pricing pricing;
    private String description;
    private List<ReviewDto> topReviews;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Pricing {
        private BigDecimal min;
        private BigDecimal max;
        private String unit;
        private String includes;
        private String excludes;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReviewDto {
        private Long id;
        private String reviewerName;
        private String reviewerRole;
        private Integer rating;
        private String content;
    }
}
