package io.chb.chb.core.exception;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponse {
    private String exception;

    private String code;

    private String title;

    private String message;

    private int status;

    private String error;
}