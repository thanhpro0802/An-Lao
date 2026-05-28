package com.anlao.anlao_api.mapper;

import com.anlao.anlao_api.dto.response.BookingResponse;
import com.anlao.anlao_api.entity.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BookingMapper {
    @Mapping(target = "facilityId", source = "facility.id")
    @Mapping(target = "facilityName", source = "facility.name")
    BookingResponse toBookingResponse(Booking booking);
}
