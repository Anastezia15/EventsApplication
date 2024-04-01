package com.diplom.diplom_work.model.dto;

import lombok.Data;

import javax.validation.constraints.Future;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.sql.Time;

@Data
public class EventUpdateDto {
    @Size(min = 3, message = "Title must be at least 3 characters")
    @Size(max = 50, message = "Title must be no more than 50 characters")
    private String title;

    @Size(max = 300, message = "Description must be no more than 300 characters")
    private String description;

    private String imageUrl;

    @Size(min = 3, message = "Location must be at least 3 characters")
    private String location;

    @Future(message = "Date can't be in the past =)")
    private Date date;

    private Time time;

    private String category;
}
