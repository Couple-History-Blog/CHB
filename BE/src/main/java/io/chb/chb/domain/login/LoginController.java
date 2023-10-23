package io.chb.chb.domain.login;

import io.chb.chb.core.ResponseCode;
import io.chb.chb.core.exception.BaseException;
import io.chb.chb.core.exception.ErrorType;
import io.chb.chb.core.util.UserUtils;
import io.chb.chb.domain.user.UserDTO;
import io.chb.chb.domain.user.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/chb")
public class LoginController {

    private final LoginService loginService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserUtils userUtils;


    @PostMapping("/sign-in")
    public ResponseEntity<String> signIn(@RequestParam(value = "userId", required = false) String userId
                                  , @RequestParam(value= "userPassword", required = false) String userPassword) {
        UserDTO userInfo = Optional.ofNullable(userService.findByUserId(userId))
                .orElseThrow(() -> new BaseException(ErrorType.USER_NOT_EXIST));

        if (!passwordEncoder.matches(userPassword, userInfo.getUserPassword())) {
            throw new BaseException(ErrorType.PASSWORD_NOT_MATCHED);
        }

        return ResponseEntity.ok().body(ResponseCode.LOGIN_SUCCESS.getMessage());
    }

    @PostMapping("/sign-up")
    public ResponseEntity<String> signUp(@RequestBody UserDTO userInfo) {
        userUtils.encodeUserPassword(userInfo);

        Optional.ofNullable(userService.findByUserId(userInfo.getUserId()))
                .ifPresent(user -> {
                    throw new BaseException(ErrorType.USER_ALREADY_EXIST);
                });

        loginService.signUp(userInfo);
        return ResponseEntity.ok().body(ResponseCode.NEW_USER_CREATED.getMessage());
    }

    @GetMapping("test")
    public ResponseEntity<?> test(@RequestBody UserDTO userInfo) {
        return ResponseEntity.ok(true);
    }
}

