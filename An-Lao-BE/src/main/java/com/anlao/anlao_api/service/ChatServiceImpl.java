package com.anlao.anlao_api.service;

import com.anlao.anlao_api.dto.request.ChatRequest;
import com.anlao.anlao_api.dto.response.ChatResponse;
import com.anlao.anlao_api.entity.FacilityChunk;
import com.anlao.anlao_api.repository.FacilityChunkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final GeminiApiClient geminiApiClient;
    private final FacilityChunkRepository chunkRepository;

    private static final String SYSTEM_PROMPT = """
            Bạn là một tư vấn viên chuyên nghiệp của An Lão - nền tảng tìm kiếm viện dưỡng lão uy tín tại Việt Nam.
            Nhiệm vụ của bạn là trả lời câu hỏi của khách hàng dựa trên thông tin cung cấp dưới đây.
            
            QUY TẮC QUAN TRỌNG:
            1. CHỈ sử dụng thông tin trong phần Ngữ Cảnh. Tuyệt đối KHÔNG tự bịa ra thông tin, giá cả, hoặc tên cơ sở.
            2. Nếu thông tin không có trong Ngữ Cảnh, hãy nói: 'Rất tiếc, tôi chưa có thông tin chi tiết về vấn đề này. Bạn vui lòng để lại số điện thoại để chuyên viên An Lão hỗ trợ nhé.'
            3. Luôn giữ thái độ đồng cảm, lịch sự và chuyên nghiệp.
            
            NGỮ CẢNH TÌM ĐƯỢC:
            %s
            """;

    @Override
    public ChatResponse chat(ChatRequest request) {
        // 1. Lấy Vector Embedding cho câu hỏi của User
        String embeddingStr = geminiApiClient.getEmbedding(request.getMessage());

        // 2. Query bằng pgvector, lấy tối đa 5 chunks gần nhất với khoảng cách < 0.3
        List<FacilityChunk> nearestChunks = chunkRepository.findNearestChunks(embeddingStr, 5);

        // 3. Xây dựng Context và lọc các Source (Nguồn viện dưỡng lão)
        StringBuilder contextBuilder = new StringBuilder();
        List<ChatResponse.SourceDto> sources = new ArrayList<>();

        for (int i = 0; i < nearestChunks.size(); i++) {
            FacilityChunk chunk = nearestChunks.get(i);
            contextBuilder.append("--- Đoạn thông tin ").append(i + 1).append(" ---\n");
            contextBuilder.append("Cơ sở: ").append(chunk.getFacility().getName()).append("\n");
            contextBuilder.append("Nội dung: ").append(chunk.getContent()).append("\n\n");

            boolean alreadyAdded = sources.stream()
                    .anyMatch(s -> s.getFacilityId().equals(chunk.getFacility().getId()));
            
            if (!alreadyAdded) {
                sources.add(ChatResponse.SourceDto.builder()
                        .facilityId(chunk.getFacility().getId())
                        .facilityName(chunk.getFacility().getName())
                        .build());
            }
        }

        // 4. Lắp Context vào System Prompt để gửi cho Gemini
        String finalSystemPrompt = String.format(SYSTEM_PROMPT, contextBuilder.toString());
        String aiReply = geminiApiClient.generateContent(finalSystemPrompt, request.getMessage());

        // 5. Trả kết quả
        return ChatResponse.builder()
                .reply(aiReply)
                .sources(sources)
                .build();
    }
}
