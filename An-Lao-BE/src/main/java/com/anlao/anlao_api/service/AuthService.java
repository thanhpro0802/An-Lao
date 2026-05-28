package com.anlao.anlao_api.service;

import com.anlao.anlao_api.dto.request.LoginRequest;
import com.anlao.anlao_api.dto.request.RegisterRequest;
import com.anlao.anlao_api.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse getMe(String email);
    AuthResponse updateProfile(String email, com.anlao.anlao_api.dto.request.UpdateProfileRequest request);
}
