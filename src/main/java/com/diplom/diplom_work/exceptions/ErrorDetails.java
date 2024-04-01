package com.diplom.diplom_work.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * Represents the details of an error.
 */
@Getter
@AllArgsConstructor
public class ErrorDetails {

    private final LocalDateTime timestamp;
    private final String message;
    private final String details;
}