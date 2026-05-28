package com.anlao.anlao_api.controller;

import com.anlao.anlao_api.dto.request.BookingRequest;
import com.anlao.anlao_api.dto.response.ApiResponse;
import com.anlao.anlao_api.dto.response.BookingResponse;
import com.anlao.anlao_api.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponse>> createBooking(
            @Valid @RequestBody BookingRequest request,
            Authentication authentication
    ) {
        String userEmail = authentication.getName();
        BookingResponse response = bookingService.createBooking(userEmail, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<BookingResponse>builder()
                        .status(HttpStatus.CREATED.value())
                        .message("Booking created successfully")
                        .data(response)
                        .build());
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getMyBookings(Authentication authentication) {
        String userEmail = authentication.getName();
        List<BookingResponse> responses = bookingService.getMyBookings(userEmail);
        return ResponseEntity.ok(ApiResponse.<List<BookingResponse>>builder()
                .status(HttpStatus.OK.value())
                .message("Bookings retrieved successfully")
                .data(responses)
                .build());
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<BookingResponse>> cancelBooking(
            @PathVariable Long id,
            @RequestParam(required = false) String reason,
            Authentication authentication
    ) {
        String userEmail = authentication.getName();
        BookingResponse response = bookingService.cancelBooking(userEmail, id, reason);
        return ResponseEntity.ok(ApiResponse.<BookingResponse>builder()
                .status(HttpStatus.OK.value())
                .message("Booking cancelled successfully")
                .data(response)
                .build());
    }
}
