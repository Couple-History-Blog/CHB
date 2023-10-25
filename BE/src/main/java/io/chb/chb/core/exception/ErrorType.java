package io.chb.chb.core.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorType {

    //USER
    USER_NOT_EXIST("USER001", "존재하지 않는 아이디입니다.", "NOT EXIST USER ID", HttpStatus.BAD_REQUEST),
    PASSWORD_NOT_MATCHED("USER002", "비밀번호가 일치하지 않습니다.", "WRONG PASSWORD", HttpStatus.BAD_REQUEST),
    USER_ALREADY_EXIST("USER003", "이미 존재하는 사용자입니다.", "USER ALREADY EXIST", HttpStatus.CONFLICT),
    CURRENT_USER_NOT_EXISTS("USER004", "현재 로그인된 계정이 존재하지 않습니다.", "CURRENT USER NOT EXIST", HttpStatus.NOT_FOUND),

    // LOGIN
    LOGIN_FAIL("L002", "로그인에 실패하였습니다.", "SIGN IN FAIL", HttpStatus.BAD_REQUEST)
    ;

    private final String code;
    private final String message;
    private final String title;
    private final HttpStatus status;

}
