package io.chb.chb;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class ChbApplicationTests {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Test
    void contextLoads() {
        String pwd = "testPassword";
        String encodedPwd = passwordEncoder.encode(pwd);

        Boolean successYn = passwordEncoder.matches(pwd, encodedPwd);
        System.out.println("#### : " + successYn);

    }

}
