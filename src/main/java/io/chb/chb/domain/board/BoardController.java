package io.chb.chb.domain.board;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/chb/board")
public class BoardController {

    @GetMapping("/test")
    public ResponseEntity<?> testController() {
        log.info("TEST");

        return ResponseEntity.ok(true);
    }
}
