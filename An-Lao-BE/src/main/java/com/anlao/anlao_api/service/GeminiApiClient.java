package com.anlao.anlao_api.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class GeminiApiClient {

    @Value("${gemini.api-key:}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getEmbedding(String text) {
        if (apiKey == null || apiKey.isEmpty()) {
            log.warn("Gemini API key is not configured. Returning dummy embedding for testing.");
            return Collections.nCopies(768, 0.0).toString(); // Dummy fallback if no API key is provided
        }

        String url = "https://generativelanguage.googleapis.com/v1/models/gemini-embedding-001:embedContent?key=" + apiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> parts = new HashMap<>();
        parts.put("text", text);
        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(parts));
        Map<String, Object> body = new HashMap<>();
        body.put("content", content);
        body.put("outputDimensionality", 768);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("embedding")) {
                Map<String, Object> embeddingMap = (Map<String, Object>) responseBody.get("embedding");
                List<Double> values = (List<Double>) embeddingMap.get("values");
                return values.toString(); 
            }
        } catch (Exception e) {
            log.error("Failed to get embedding from Gemini API", e);
            throw new RuntimeException("AI processing failed: Unable to get embedding");
        }
        throw new RuntimeException("AI processing failed: Invalid API response");
    }

    public String generateContent(String systemPrompt, String userMessage) {
        if (apiKey == null || apiKey.isEmpty()) {
            return "Xin lỗi, hệ thống chưa được cấu hình Gemini API Key nên không thể trả lời.";
        }

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> systemInstruction = new HashMap<>();
        Map<String, Object> systemParts = new HashMap<>();
        systemParts.put("text", systemPrompt);
        systemInstruction.put("parts", systemParts);

        Map<String, Object> parts = new HashMap<>();
        parts.put("text", userMessage);
        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(parts));
        content.put("role", "user");

        Map<String, Object> body = new HashMap<>();
        body.put("system_instruction", systemInstruction);
        body.put("contents", List.of(content));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("candidates")) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
                if (!candidates.isEmpty()) {
                    Map<String, Object> contentMap = (Map<String, Object>) candidates.get(0).get("content");
                    List<Map<String, Object>> partsList = (List<Map<String, Object>>) contentMap.get("parts");
                    if (!partsList.isEmpty()) {
                        return (String) partsList.get(0).get("text");
                    }
                }
            }
        } catch (Exception e) {
            log.error("Failed to generate content from Gemini API", e);
            throw new RuntimeException("AI response generation failed");
        }
        throw new RuntimeException("AI response generation failed");
    }
}
