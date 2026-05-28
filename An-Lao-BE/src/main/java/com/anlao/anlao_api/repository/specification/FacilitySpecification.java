package com.anlao.anlao_api.repository.specification;

import com.anlao.anlao_api.entity.Facility;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class FacilitySpecification {

    public static Specification<Facility> filterFacilities(String query, String district, BigDecimal maxPrice, List<String> features) {
        return (root, queryObj, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filter by query (name)
            if (query != null && !query.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("name")), 
                        "%" + query.toLowerCase() + "%"
                ));
            }

            // Filter by district
            if (district != null && !district.trim().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("district"), district));
            }

            // Filter by maxPrice (price_min <= maxPrice)
            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("priceMin"), maxPrice));
            }

            // Filter by features (tags)
            // PostgreSQL array overlaps or contains can be tricky with Criteria API without custom dialect functions.
            // As a simple workaround using standard JPA, we check if each feature is contained in the tags string representation.
            // A more advanced approach would use CriteriaBuilder.function("array_to_string", String.class, root.get("tags"), criteriaBuilder.literal(","))
            if (features != null && !features.isEmpty()) {
                for (String feature : features) {
                    predicates.add(
                        criteriaBuilder.like(
                            criteriaBuilder.function("array_to_string", String.class, root.get("tags"), criteriaBuilder.literal(",")),
                            "%" + feature + "%"
                        )
                    );
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
