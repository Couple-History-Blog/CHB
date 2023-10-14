package io.chb.chb.domain.login;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/chb")
public class LoginConterlloer {

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(String userId, String userPassword) {

        return ResponseEntity.ok(true);
    }
}

