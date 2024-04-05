package com.diplom.diplom_work.repository;


import com.diplom.diplom_work.model.Category;
import com.diplom.diplom_work.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    boolean existsByTitle(String title);

    Optional<Event> findByTitle(String title);

    Optional<Event> findByCreatorId(Long creatorId);

    Page<Event> findByCategory(Category category, Pageable pageable);

    @Query("SELECT e FROM Event e WHERE LOWER(e.category.name) LIKE LOWER(:categoryName)")
    List<Event> findEventsByCategoryName(@Param("categoryName") String categoryName);


    @Query("SELECT e FROM Event e WHERE e.category = :category AND e.date >= CURRENT_TIMESTAMP ORDER BY e.date ASC")
    Page<Event> findUpcomingEventsByCategory(@Param("category") Category category, Pageable pageable);


}

