package io.chb.chb.core.exception;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Objects;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@ControllerAdvice
@Slf4j
public class ExceptionHelper {

    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        log.error(ExceptionUtils.getStackTrace(e));

        HttpStatus status = INTERNAL_SERVER_ERROR;
        String code = "NO_CATCH_ERROR";
        String className = e.getClass().getName();
        String message = e.getMessage();

        ErrorResponse errorResponse = ErrorResponse.builder()
                .exception(className.substring(className.lastIndexOf(".") + 1))
                .code(code)
                .message(message)
                .status(status.value())
                .error(status.getReasonPhrase())
                .build();

        return new ResponseEntity<>(errorResponse, status);
    }


    @ExceptionHandler(value = {BaseException.class})
    public ResponseEntity<ErrorResponse> handleBaseException(BaseException e) {
        log.error(ExceptionUtils.getStackTrace(e));

        String className = e.getClass().getName();
        ErrorType errorType = e.getErrorType();

        if (Objects.isNull(errorType)) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .exception(className.substring(className.lastIndexOf(".") + 1))
                    .code(null)
                    .message(e.getMessage())
                    .title(null)
                    .status(INTERNAL_SERVER_ERROR.value())
                    .error(null)
                    .build();

            return new ResponseEntity<>(errorResponse, INTERNAL_SERVER_ERROR);
        } else {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .exception(className.substring(className.lastIndexOf(".") + 1))
                    .code(errorType.getCode())
                    .message(errorType.getMessage())
                    .title(errorType.getTitle())
                    .status(errorType.getStatus().value())
                    .error(errorType.getStatus().getReasonPhrase())
                    .build();

            return new ResponseEntity<>(errorResponse, errorType.getStatus());
        }
    }

}