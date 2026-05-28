package com.anlao.anlao_api.controller;

import com.anlao.anlao_api.dto.request.FacilityFilterRequest;
import com.anlao.anlao_api.dto.response.ApiResponse;
import com.anlao.anlao_api.dto.response.FacilityDetailResponse;
import com.anlao.anlao_api.dto.response.FacilityResponse;
import com.anlao.anlao_api.service.FacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/facilities")
@RequiredArgsConstructor
public class FacilityController {

    private final FacilityService facilityService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<FacilityResponse>>> searchFacilities(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) List<String> features,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        FacilityFilterRequest filterRequest = FacilityFilterRequest.builder()
                .query(query)
                .district(district)
                .maxPrice(maxPrice)
                .features(features)
                .build();

        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<FacilityResponse> facilityPage = facilityService.searchFacilities(filterRequest, pageable);

        return ResponseEntity.ok(ApiResponse.<Page<FacilityResponse>>builder()
                .status(HttpStatus.OK.value())
                .message("Facilities retrieved successfully")
                .data(facilityPage)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<FacilityDetailResponse>> getFacilityById(@PathVariable Long id) {
        FacilityDetailResponse facility = facilityService.getFacilityById(id);
        
        return ResponseEntity.ok(ApiResponse.<FacilityDetailResponse>builder()
                .status(HttpStatus.OK.value())
                .message("Facility retrieved successfully")
                .data(facility)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<FacilityDetailResponse>> updateFacility(
            org.springframework.security.core.Authentication authentication,
            @PathVariable Long id,
            @RequestBody com.anlao.anlao_api.dto.request.UpdateFacilityRequest request
    ) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ADMIN") || a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        FacilityDetailResponse facility = facilityService.updateFacility(id, request);

        return ResponseEntity.ok(ApiResponse.<FacilityDetailResponse>builder()
                .status(HttpStatus.OK.value())
                .message("Facility updated successfully")
                .data(facility)
                .build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<FacilityDetailResponse>> createFacility(
            org.springframework.security.core.Authentication authentication,
            @jakarta.validation.Valid @RequestBody com.anlao.anlao_api.dto.request.CreateFacilityRequest request
    ) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ADMIN") || a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        FacilityDetailResponse facility = facilityService.createFacility(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<FacilityDetailResponse>builder()
                .status(HttpStatus.CREATED.value())
                .message("Facility created successfully")
                .data(facility)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteFacility(
            org.springframework.security.core.Authentication authentication,
            @PathVariable Long id
    ) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ADMIN") || a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        facilityService.deleteFacility(id);

        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .status(HttpStatus.OK.value())
                .message("Facility deleted successfully")
                .build());
    }
}
