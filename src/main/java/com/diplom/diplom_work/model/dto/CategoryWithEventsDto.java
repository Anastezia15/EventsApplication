package com.diplom.diplom_work.model.dto;

import com.diplom.diplom_work.model.Category;
import com.diplom.diplom_work.model.Event;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Set;

@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
@ToString
public class CategoryWithEventsDto {
    private Long id;
    private String name;
    private Set<Event> events;

    public CategoryWithEventsDto(Category category) {
        this.id = category.getId();
        this.name = category.getName();
    }
}
