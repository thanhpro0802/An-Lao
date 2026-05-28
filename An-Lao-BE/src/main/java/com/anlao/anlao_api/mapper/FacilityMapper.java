package com.anlao.anlao_api.mapper;

import com.anlao.anlao_api.dto.response.FacilityDetailResponse;
import com.anlao.anlao_api.dto.response.FacilityResponse;
import com.anlao.anlao_api.entity.Facility;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FacilityMapper {

    FacilityResponse toFacilityResponse(Facility facility);

    @Mapping(target = "pricing.min", source = "priceMin")
    @Mapping(target = "pricing.max", source = "priceMax")
    @Mapping(target = "pricing.unit", source = "priceUnit")
    @Mapping(target = "pricing.includes", source = "priceIncludes")
    @Mapping(target = "pricing.excludes", source = "priceExcludes")
    FacilityDetailResponse toFacilityDetailResponse(Facility facility);
}
