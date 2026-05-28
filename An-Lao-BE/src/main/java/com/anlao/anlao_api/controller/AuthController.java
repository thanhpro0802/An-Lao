package com.anlao.anlao_api.controller;

import com.anlao.anlao_api.dto.request.LoginRequest;
import com.anlao.anlao_api.dto.request.RegisterRequest;
import com.anlao.anlao_api.dto.response.ApiResponse;
import com.anlao.anlao_api.dto.response.AuthResponse;
import com.anlao.anlao_api.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<AuthResponse>builder()
                        .status(HttpStatus.CREATED.value())
                        .message("User registered successfully")
                        .data(response)
                        .build());
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
                .status(HttpStatus.OK.value())
                .message("Login successful")
                .data(response)
                .build());
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<AuthResponse>> getMe(Authentication authentication) {
        AuthResponse response = authService.getMe(authentication.getName());
        return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
                .status(HttpStatus.OK.value())
                .message("User info retrieved successfully")
                .data(response)
                .build());
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<AuthResponse>> updateProfile(
            Authentication authentication,
            @RequestBody com.anlao.anlao_api.dto.request.UpdateProfileRequest request) {
        AuthResponse response = authService.updateProfile(authentication.getName(), request);
        return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
                .status(HttpStatus.OK.value())
                .message("User profile updated successfully")
                .data(response)
                .build());
    }
}
