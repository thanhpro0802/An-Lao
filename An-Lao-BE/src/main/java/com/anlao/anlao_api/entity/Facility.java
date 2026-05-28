package com.anlao.anlao_api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

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

    @Column(length = 500)
    private String address;

    @Column(length = 100)
    private String district;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "price_min", precision = 15, scale = 2)
    private BigDecimal priceMin;

    @Column(name = "price_max", precision = 15, scale = 2)
    private BigDecimal priceMax;

    @Column(name = "price_unit", length = 100)
    private String priceUnit;

    @Column(name = "price_includes", columnDefinition = "TEXT")
    private String priceIncludes;

    @Column(name = "price_excludes", columnDefinition = "TEXT")
    private String priceExcludes;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "images", columnDefinition = "TEXT[]")
    private List<String> images;

    @Builder.Default
    @Column(name = "is_verified")
    private Boolean isVerified = false;

    @Builder.Default
    @Column(name = "is_warning")
    private Boolean isWarning = false;

    @Builder.Default
    @Column(precision = 3, scale = 1)
    private BigDecimal rating = BigDecimal.ZERO;

    @Builder.Default
    @Column(name = "review_count")
    private Integer reviewCount = 0;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "tags", columnDefinition = "TEXT[]")
    private List<String> tags;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
