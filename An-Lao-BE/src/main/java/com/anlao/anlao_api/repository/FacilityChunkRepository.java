package com.anlao.anlao_api.repository;

import com.anlao.anlao_api.entity.FacilityChunk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacilityChunkRepository extends JpaRepository<FacilityChunk, Long> {

    @Query(value = "SELECT * FROM facility_chunks " +
                   "WHERE embedding <=> CAST(:embedding AS vector) < 0.45 " +
                   "ORDER BY embedding <=> CAST(:embedding AS vector) " +
                   "LIMIT :k", 
           nativeQuery = true)
    List<FacilityChunk> findNearestChunks(@Param("embedding") String embedding, @Param("k") int k);

    @org.springframework.data.jpa.repository.Modifying
    @Query(value = "INSERT INTO facility_chunks (facility_id, content, embedding) " +
                   "VALUES (:facilityId, :content, CAST(:embedding AS vector))", 
           nativeQuery = true)
    void insertChunkNative(@Param("facilityId") Long facilityId, 
                           @Param("content") String content, 
                           @Param("embedding") String embedding);
}
