package com.anlao.anlao_api.service;

import com.anlao.anlao_api.dto.request.BookingRequest;
import com.anlao.anlao_api.dto.response.BookingResponse;

import java.util.List;

public interface BookingService {
    BookingResponse createBooking(String userEmail, BookingRequest request);
    List<BookingResponse> getMyBookings(String userEmail);
    BookingResponse cancelBooking(String userEmail, Long bookingId, String reason);
}
