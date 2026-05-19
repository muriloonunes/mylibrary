package com.murilo.library.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 19/05/2026
 * @brief Class GlobalExceptionHandler
 */
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Object> handleResponseStatusException(ResponseStatusException e) {
        return ResponseEntity
                .status(e.getStatusCode())
                .body(Map.of("message", e.getReason() != null ? e.getReason() : "Ocorreu um erro"));
    }
}
