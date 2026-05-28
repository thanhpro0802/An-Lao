package com.anlao.anlao_api.service;

import com.anlao.anlao_api.dto.request.BookingRequest;
import com.anlao.anlao_api.dto.response.BookingResponse;
import com.anlao.anlao_api.entity.Booking;
import com.anlao.anlao_api.entity.Facility;
import com.anlao.anlao_api.entity.User;
import com.anlao.anlao_api.exception.BadRequestException;
import com.anlao.anlao_api.exception.ResourceNotFoundException;
import com.anlao.anlao_api.mapper.BookingMapper;
import com.anlao.anlao_api.repository.BookingRepository;
import com.anlao.anlao_api.repository.FacilityRepository;
import com.anlao.anlao_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final FacilityRepository facilityRepository;
    private final BookingMapper bookingMapper;

    @Override
    public BookingResponse createBooking(String userEmail, BookingRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Facility facility = facilityRepository.findById(request.getFacilityId())
                .orElseThrow(() -> new ResourceNotFoundException("Facility not found with id: " + request.getFacilityId()));

        Booking booking = Booking.builder()
                .user(user)
                .facility(facility)
                .contactName(request.getContactName())
                .contactPhone(request.getContactPhone())
                .relativeType(request.getRelativeType())
                .healthStatuses(request.getHealthStatuses())
                .visitDate(request.getVisitDate())
                .visitTime(request.getVisitTime())
                .note(request.getNote())
                .status("PENDING")
                .hasReviewed(false)
                .build();

        Booking savedBooking = bookingRepository.save(booking);
        return bookingMapper.toBookingResponse(savedBooking);
    }

    @Override
    public List<BookingResponse> getMyBookings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Booking> bookings = bookingRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return bookings.stream()
                .map(bookingMapper::toBookingResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BookingResponse cancelBooking(String userEmail, Long bookingId, String reason) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        if (!booking.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("You do not have permission to cancel this booking");
        }

        if (!booking.getStatus().equals("PENDING") && !booking.getStatus().equals("CONFIRMED")) {
            throw new BadRequestException("Only PENDING or CONFIRMED bookings can be cancelled");
        }

        booking.setStatus("CANCELLED");
        booking.setCancelReason(reason);

        Booking updatedBooking = bookingRepository.save(booking);
        return bookingMapper.toBookingResponse(updatedBooking);
    }
}
