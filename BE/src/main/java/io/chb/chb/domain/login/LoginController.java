package io.chb.chb.domain.login;

import io.chb.chb.core.ResponseCode;
import io.chb.chb.core.config.jwt.JwtTokenProvider;
import io.chb.chb.core.exception.BaseException;
import io.chb.chb.core.exception.ErrorType;
import io.chb.chb.core.util.UserUtils;
import io.chb.chb.domain.user.UserDTO;
import io.chb.chb.domain.user.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/chb")
public class LoginController {

    private final LoginService loginService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserUtils userUtils;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;


    @ApiOperation(value = "사용자 정보", notes = "로그인 처리 및 JwtToken 반환해준다.")
    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestParam(value = "userId", required = false) String userId
                                  , @RequestParam(value= "userPassword", required = false) String userPassword) {
        UserDTO userInfo = Optional.ofNullable(userService.findByUserId(userId))
                .orElseThrow(() -> new BaseException(ErrorType.USER_NOT_EXIST));

        if (!passwordEncoder.matches(userPassword, userInfo.getUserPassword())) {
            throw new BaseException(ErrorType.PASSWORD_NOT_MATCHED);
        }

        UserDTO.TokenInfo userTokenInfo = jwtTokenProvider.generateToken(userId, Collections.singletonList(userInfo.getUserRole()));

        redisTemplate.opsForValue()
                .set("RT:" + userId, userTokenInfo.getRefreshToken(), userTokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);


        return ResponseEntity.ok().body(userTokenInfo);
    }

    @ApiOperation(value = "사용자 가입 정보", notes = "회원가입 처리")
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

    @ApiOperation(value = "사용자 정보", notes = "로그아웃 처리")
    @PostMapping("/sign-out")
    public ResponseEntity<?> signOut(@RequestBody (required = false) UserDTO.TokenInfo userInfo) {
        String accessToken = userInfo.getAccessToken();

        // 1. Access Token 검증
        if (!jwtTokenProvider.validateToken(accessToken)) {
            return ResponseEntity.ok(true);
        }

        userUtils.userSignOut(accessToken);

        return ResponseEntity.ok(true);
    }


    @GetMapping("test")
    public ResponseEntity<?> test() {

        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        SimpleStringPBEConfig config = new SimpleStringPBEConfig();

        config.setPassword("qnpfzns590192N#$!na");
        config.setAlgorithm("PBEWithMD5AndDES");
        config.setKeyObtentionIterations("1000");
        config.setPoolSize("1");
        encryptor.setConfig(config);

        String test = "asnrpqndfan14n1240!@!#!3012a";
        String encode = encryptor.encrypt(test);
        String decode = encryptor.decrypt(encode);
        log.info(encode);
        log.info(decode);

        encode = encryptor.encrypt("qnpfzns590192N#$!na");
        decode = encryptor.decrypt(encode);
        log.info(encode);
        log.info(decode);

        return ResponseEntity.ok(true);
    }
}

