package com.anlao.anlao_api.service;

import com.anlao.anlao_api.dto.request.FacilityFilterRequest;
import com.anlao.anlao_api.dto.response.FacilityDetailResponse;
import com.anlao.anlao_api.dto.response.FacilityResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FacilityService {
    Page<FacilityResponse> searchFacilities(FacilityFilterRequest request, Pageable pageable);
    FacilityDetailResponse getFacilityById(Long id);
    FacilityDetailResponse updateFacility(Long id, com.anlao.anlao_api.dto.request.UpdateFacilityRequest request);
    FacilityDetailResponse createFacility(com.anlao.anlao_api.dto.request.CreateFacilityRequest request);
    void deleteFacility(Long id);
}
