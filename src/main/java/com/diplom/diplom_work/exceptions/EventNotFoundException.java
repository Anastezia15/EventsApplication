package com.diplom.diplom_work.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class EventNotFoundException extends RuntimeException {

    /**
     * Constructs a new instance of {@code EventNotFoundException} with the specified event ID.
     *
     * @param id the ID of the event that cannot be found.
     */
    public EventNotFoundException(Long id) {
        super("Can't find the event with the id " + id);
    }
    public EventNotFoundException(String title) {
        super("Can't find the event with the title " + title);
    }
    public EventNotFoundException(Long creatorId, Long s) {
        super("Can't find the event with the CreatorId " + creatorId);
    }
}