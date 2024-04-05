package com.diplom.diplom_work.controller;

import com.diplom.diplom_work.model.Category;
import com.diplom.diplom_work.model.dto.CategoryDto;
import com.diplom.diplom_work.model.dto.CategoryWithEventsDto;
import com.diplom.diplom_work.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAll();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);


        return ResponseEntity.ok(category);
    }

    @GetMapping("/{id}/events")
    public ResponseEntity<CategoryWithEventsDto> getCategoryEvents(
            @PathVariable Long id) {
        Category category = categoryService.getWithEvents(id);
        return ResponseEntity.ok(new CategoryWithEventsDto(category));
    }

    @PostMapping("/admin")
    public ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) {
        Category createdCategory = categoryService.createCategory(category);

        return ResponseEntity.created(null).body(createdCategory);
    }

    @PatchMapping("/admin/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id,
                                                   @RequestBody CategoryDto categoryDto) {
        Category updatedCategory = categoryService.updateCategory(id, categoryDto);

        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
}
