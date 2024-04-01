package com.diplom.diplom_work.model.dto;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class CategoryDto {

    @Size(min = 3, message = "Name must be at least 3 characters")
    @Size(max = 50, message = "Name must be no more than 50 characters")
    private String name;
}
