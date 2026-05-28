package com.anlao.anlao_api.component;

import com.anlao.anlao_api.entity.Facility;
import com.anlao.anlao_api.entity.FacilityChunk;
import com.anlao.anlao_api.repository.FacilityChunkRepository;
import com.anlao.anlao_api.repository.FacilityRepository;
import com.anlao.anlao_api.service.GeminiApiClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class VectorSeeder implements CommandLineRunner {

    private final FacilityRepository facilityRepository;
    private final FacilityChunkRepository chunkRepository;
    private final GeminiApiClient geminiApiClient;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (chunkRepository.count() == 0) {
            log.info("No facility chunks found. Seeding vectors using Gemini API...");
            
            List<Facility> facilities = facilityRepository.findAll();
            for (Facility facility : facilities) {
                // Build a rich text context to embed
                String context = String.format("Tên cơ sở: %s. Địa chỉ: %s, %s. Mô tả: %s. Giá: từ %s đến %s %s. Phí bao gồm: %s. Phụ phí: %s. Tiện ích: %s.",
                        facility.getName(),
                        facility.getAddress(),
                        facility.getDistrict(),
                        facility.getDescription(),
                        facility.getPriceMin(),
                        facility.getPriceMax(),
                        facility.getPriceUnit(),
                        facility.getPriceIncludes() != null ? facility.getPriceIncludes() : "Không có",
                        facility.getPriceExcludes() != null ? facility.getPriceExcludes() : "Không có",
                        facility.getTags() != null ? String.join(", ", facility.getTags()) : "Không có"
                );

                try {
                    String embedding = geminiApiClient.getEmbedding(context);
                    
                    // We must save using a native query because Hibernate might not handle string to vector(768) cast natively
                    chunkRepository.insertChunkNative(facility.getId(), context, embedding);
                } catch (Exception e) {
                    log.error("Failed to seed vector for facility {}: {}", facility.getId(), e.getMessage());
                }
            }
            log.info("Vector seeding completed!");
        }
    }
}
