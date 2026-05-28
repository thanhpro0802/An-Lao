package com.anlao.anlao_api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatResponse {
    private String reply;
    private List<SourceDto> sources;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SourceDto {
        private Long facilityId;
        private String facilityName;
    }
}
