package com.anlao.anlao_api.service;

import com.anlao.anlao_api.dto.request.FacilityFilterRequest;
import com.anlao.anlao_api.dto.response.FacilityDetailResponse;
import com.anlao.anlao_api.dto.response.FacilityResponse;
import com.anlao.anlao_api.entity.Facility;
import com.anlao.anlao_api.entity.Review;
import com.anlao.anlao_api.exception.ResourceNotFoundException;
import com.anlao.anlao_api.mapper.FacilityMapper;
import com.anlao.anlao_api.repository.FacilityRepository;
import com.anlao.anlao_api.repository.ReviewRepository;
import com.anlao.anlao_api.repository.specification.FacilitySpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FacilityServiceImpl implements FacilityService {

    private final FacilityRepository facilityRepository;
    private final ReviewRepository reviewRepository;
    private final FacilityMapper facilityMapper;

    @Override
    public Page<FacilityResponse> searchFacilities(FacilityFilterRequest request, Pageable pageable) {
        Specification<Facility> spec = FacilitySpecification.filterFacilities(
                request.getQuery(),
                request.getDistrict(),
                request.getMaxPrice(),
                request.getFeatures()
        );

        Page<Facility> facilities = facilityRepository.findAll(spec, pageable);
        return facilities.map(facilityMapper::toFacilityResponse);
    }

    @Override
    public FacilityDetailResponse getFacilityById(Long id) {
        Facility facility = facilityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Facility not found with id: " + id));
        
        FacilityDetailResponse response = facilityMapper.toFacilityDetailResponse(facility);
        
        // Fetch top 3 latest reviews
        List<Review> recentReviews = reviewRepository.findByFacilityIdOrderByCreatedAtDesc(id, PageRequest.of(0, 3));
        
        List<FacilityDetailResponse.ReviewDto> topReviews = recentReviews.stream().map(r -> 
            FacilityDetailResponse.ReviewDto.builder()
                .id(r.getId())
                .reviewerName(r.getReviewerName())
                .reviewerRole(r.getReviewerRole())
                .rating(r.getRating())
                .content(r.getContent())
                .build()
        ).collect(Collectors.toList());
        
        response.setTopReviews(topReviews);
        return response;
    }

    @Override
    public FacilityDetailResponse updateFacility(Long id, com.anlao.anlao_api.dto.request.UpdateFacilityRequest request) {
        Facility facility = facilityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Facility not found with id: " + id));

        if (request.getName() != null) facility.setName(request.getName());
        if (request.getAddress() != null) facility.setAddress(request.getAddress());
        if (request.getDistrict() != null) facility.setDistrict(request.getDistrict());
        if (request.getDescription() != null) facility.setDescription(request.getDescription());
        if (request.getPriceMin() != null) facility.setPriceMin(request.getPriceMin());
        if (request.getPriceMax() != null) facility.setPriceMax(request.getPriceMax());
        if (request.getPriceUnit() != null) facility.setPriceUnit(request.getPriceUnit());
        if (request.getPriceIncludes() != null) facility.setPriceIncludes(request.getPriceIncludes());
        if (request.getPriceExcludes() != null) facility.setPriceExcludes(request.getPriceExcludes());
        if (request.getImageUrl() != null) facility.setImageUrl(request.getImageUrl());
        if (request.getImages() != null) facility.setImages(request.getImages());
        if (request.getTags() != null) facility.setTags(request.getTags());
        if (request.getIsVerified() != null) facility.setIsVerified(request.getIsVerified());
        if (request.getIsWarning() != null) facility.setIsWarning(request.getIsWarning());

        facilityRepository.save(facility);

        return getFacilityById(id);
    }

    @Override
    public FacilityDetailResponse createFacility(com.anlao.anlao_api.dto.request.CreateFacilityRequest request) {
        Facility facility = Facility.builder()
                .name(request.getName())
                .address(request.getAddress())
                .district(request.getDistrict())
                .description(request.getDescription())
                .priceMin(request.getPriceMin())
                .priceMax(request.getPriceMax())
                .priceUnit(request.getPriceUnit())
                .priceIncludes(request.getPriceIncludes())
                .priceExcludes(request.getPriceExcludes())
                .imageUrl(request.getImageUrl())
                .images(request.getImages())
                .tags(request.getTags())
                .isVerified(true)
                .build();
                
        Facility savedFacility = facilityRepository.save(facility);
        return facilityMapper.toFacilityDetailResponse(savedFacility);
    }

    @Override
    public void deleteFacility(Long id) {
        if (!facilityRepository.existsById(id)) {
            throw new ResourceNotFoundException("Facility not found with id: " + id);
        }
        facilityRepository.deleteById(id);
    }
}
