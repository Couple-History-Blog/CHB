package io.chb.chb.domain.user;

import io.chb.chb.core.config.jwt.JwtTokenProvider;
import io.chb.chb.core.exception.BaseException;
import io.chb.chb.core.exception.ErrorType;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/chb")
public class UserController {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    @ApiOperation(value = "현재 사용자 정보", notes = "현재 사용자 정보를 반환한다.")
    @GetMapping("/current-user")
    public ResponseEntity<?> currentUser(@RequestParam(value = "userJwtToken", required = false) String userJwtToken) {

        if (jwtTokenProvider.validateToken(userJwtToken)) {
            return ResponseEntity.ok().body(jwtTokenProvider.getUserInfo(userJwtToken));
        }

        throw new BaseException(ErrorType.CURRENT_USER_NOT_EXISTS);
    }

    @ApiOperation(value = "아이디 중복 확인", notes = "아이디가 이미 존재하는지 확인.")
    @GetMapping("/check-available-id")
    public boolean checkAvailableId(@RequestParam(value = "userId", required = false) String userId) {
        return userService.canUseId(userId);
    }


}
