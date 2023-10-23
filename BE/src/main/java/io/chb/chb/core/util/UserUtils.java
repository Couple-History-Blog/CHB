package io.chb.chb.core.util;

import io.chb.chb.core.config.jwt.JwtTokenProvider;
import io.chb.chb.domain.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@AllArgsConstructor
public class UserUtils {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;

    public void encodeUserPassword(UserDTO userInfo) {
        String encodedUserPassword = passwordEncoder.encode(userInfo.getUserPassword());
        userInfo.setUserPassword(encodedUserPassword);
    }

    public void userSignOut(String accessToken) {
        // 2. Access Token 에서 User ID 가져옴.
        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);

        // 3. Redis 에서 해당 User ID 로 저장된 Refresh Token 이 있는지 여부를 확인 후 있을 경우 삭제.
        String refreshTokenInRedis = (String) redisTemplate.opsForValue().get("RT:" + authentication.getName());
        if (Objects.isNull(refreshTokenInRedis)) {
            // Refresh Token 삭제
            redisTemplate.delete("RT:" + authentication.getName());
        }

        // 4. 해당 Access Token 유효시간 가지고 와서 BlackList 로 저장하기
        Long expiration = jwtTokenProvider.getExpiration(accessToken);
        redisTemplate.opsForValue()
                .set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);

    }
}
