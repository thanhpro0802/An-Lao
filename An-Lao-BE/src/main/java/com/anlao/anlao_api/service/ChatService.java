package com.anlao.anlao_api.service;

import com.anlao.anlao_api.dto.request.ChatRequest;
import com.anlao.anlao_api.dto.response.ChatResponse;

public interface ChatService {
    ChatResponse chat(ChatRequest request);
}
