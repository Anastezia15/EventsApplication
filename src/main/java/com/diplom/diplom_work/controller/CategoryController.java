package com.diplom.diplom_work.controller;

import com.diplom.diplom_work.model.Category;
import com.diplom.diplom_work.model.Event;
import com.diplom.diplom_work.model.dto.CategoryDto;
import com.diplom.diplom_work.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin
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
    public ResponseEntity<List<Event>> getCategoryEvents(
            @PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getWithEvents(id));
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
