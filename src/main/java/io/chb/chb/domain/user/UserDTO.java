package io.chb.chb.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserDTO {

    // 일반 계정 및 커플 계정 공용
    private String userId;
    private String userPassword;        // 인코딩 된 텍스트
    private String userName;
    private String sexType;

    // 일반 계정 전용
    private boolean beCoupleYn;
    private String userRole;

}
