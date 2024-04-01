package com.diplom.diplom_work.model.dto.adapter;


import com.diplom.diplom_work.model.Category;
import com.diplom.diplom_work.model.Event;
import com.diplom.diplom_work.model.dto.EventCreateDto;
import com.diplom.diplom_work.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class EventCreateDtoAdapter {

    private final CategoryService categoryService;

    public Event fromDto(EventCreateDto dto) {
        Category category = categoryService.getCategoryByName(dto.getCategory());

        return Event.builder()
                .creatorId(dto.getCreatorId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .imageUrl(dto.getImageUrl())
                .location(dto.getLocation())
                .date(dto.getDate())
                .time(dto.getTime())
                .category(category)
                .build();
    }
    public EventCreateDto toDto(Event event) {
        String category = event.getCategory().getName();

        return EventCreateDto.builder()
                .creatorId(event.getCreatorId())
                .title(event.getTitle())
                .description(event.getDescription())
                .imageUrl(event.getImageUrl())
                .location(event.getLocation())
                .date(event.getDate())
                .time(event.getTime())
                .category(category)
                .build();
    }

}
