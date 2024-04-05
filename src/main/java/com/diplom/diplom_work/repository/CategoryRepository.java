package com.diplom.diplom_work.repository;

import com.diplom.diplom_work.model.Category;
import com.diplom.diplom_work.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByName(String name);

    Optional<Category> findByName(String name);

    @Query("SELECT e FROM Event e WHERE e.category.name LIKE :categoryName")
    List<Event> findEventsByCategoryName(@Param("categoryName") String categoryName);

}
