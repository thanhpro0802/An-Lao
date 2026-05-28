package com.anlao.anlao_api.repository;

import com.anlao.anlao_api.entity.Review;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByFacilityIdOrderByCreatedAtDesc(Long facilityId, Pageable pageable);
}
