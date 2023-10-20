package io.chb.chb.domain.login;

import io.chb.chb.core.ResponseCode;
import io.chb.chb.core.exception.BaseException;
import io.chb.chb.core.exception.ErrorType;
import io.chb.chb.domain.user.UserDTO;
import io.chb.chb.domain.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/chb")
public class LoginConterlloer {

    private final LoginService loginService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public LoginConterlloer(LoginService loginService, UserService userService, PasswordEncoder passwordEncoder) {
        this.loginService = loginService;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(String userId, String userPassword) {
        UserDTO userInfo = userService.findByUserId(userId);

        if (!passwordEncoder.matches(userPassword, userInfo.getUserPassword())) {
            throw new BaseException(ErrorType.PASSWORD_NOT_MATCHED);
        }

        return ResponseEntity.ok().body(ResponseCode.LOGIN_SUCCESS.getMessage());
    }

    @PostMapping("/sign-up")
    public ResponseEntity<String> signUp(String userId, String userPassword, String userName, String sexType) {
        UserDTO userInfo = UserDTO.builder().userId(userId)
                                            .userName(userName)
                                            .userPassword(passwordEncoder.encode(userPassword))
                                            .sexType(sexType)
                                    .build();

        Optional.ofNullable(userService.findByUserId(userId))
                        .ifPresent(user -> new BaseException(ErrorType.USER_ALREADY_EXIST));

        loginService.signUp(userInfo);
        return ResponseEntity.ok().body(ResponseCode.NEW_USER_CREATED.getMessage());
    }


}

