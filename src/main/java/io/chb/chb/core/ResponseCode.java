package io.chb.chb.core;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResponseCode {

    // 계정
    NEW_USER_CREATED("U001", "계정이 생성되었습니다."),

    // 로그인
    LOGIN_SUCCESS("L001", "로그인에 성공하였습니다.");

    private final String code;
    private final String message;

}
