package io.chb.chb.core;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResponseCode {

    // 계정
    NEW_USER_CREATED("U001", "계정이 생성되었습니다."),
    APPLY_COUPLE_SUCCESS("U002", "커플 요청을 보냈습니다."),
    BE_COUPLE_SUCCESS("U003", "커플 계정이 성공적으로 생성되었습니다."),
    NOT_APPLY_COUPLE("U004", "상대방이 아직 커플 요청을 받지 않았습니다."),
    UPLOAD_PROFILE_SUCCESS("U005", "프로필이 변경되었습니다."),

    // 로그인
    LOGIN_SUCCESS("L001", "로그인에 성공하였습니다.");

    private final String code;
    private final String message;

}
