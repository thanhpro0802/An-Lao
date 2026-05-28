package com.anlao.anlao_api.controller;

import com.anlao.anlao_api.dto.request.ChatRequest;
import com.anlao.anlao_api.dto.response.ApiResponse;
import com.anlao.anlao_api.dto.response.ChatResponse;
import com.anlao.anlao_api.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    public ResponseEntity<ApiResponse<ChatResponse>> askChatbot(@Valid @RequestBody ChatRequest request) {
        ChatResponse response = chatService.chat(request);
        return ResponseEntity.ok(ApiResponse.<ChatResponse>builder()
                .status(HttpStatus.OK.value())
                .message("Chat response generated successfully")
                .data(response)
                .build());
    }
}
