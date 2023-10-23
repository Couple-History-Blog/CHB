package io.chb.chb.core.util;

import io.chb.chb.domain.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor
public class UserUtils {

    private final PasswordEncoder passwordEncoder;

    public void encodeUserPassword(UserDTO userInfo) {
        String encodedUserPassword = passwordEncoder.encode(userInfo.getUserPassword());
        userInfo.setUserPassword(encodedUserPassword);
    }

}
