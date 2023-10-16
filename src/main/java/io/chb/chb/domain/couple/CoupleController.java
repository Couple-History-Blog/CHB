package io.chb.chb.domain.couple;

import io.chb.chb.core.ResponseCode;
import io.chb.chb.domain.user.UserDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/chb")
public class CoupleController {

    private final CoupleService coupleService;

    public CoupleController(CoupleService coupleService) {
        this.coupleService = coupleService;
    }

    // TODO 아이디로 커플 신청
    @PostMapping("/couple-apply")
    public ResponseEntity<String> coupleApplyUp(CoupleDTO userInfo) {

        coupleService.applyBeCouple(userInfo);

        return ResponseEntity.ok().body(ResponseCode.APPLY_COUPLE_SUCCESS.getMessage());
    }

    @GetMapping("/couple-waiting")
    public ResponseEntity<String> coupleWaitPage(String userId) {
        CoupleDTO coupleInfo = coupleService.getCoupleStatusByUserId(userId);

        if (coupleInfo.isOtherAcceptYn()) return ResponseEntity.ok().body(ResponseCode.BE_COUPLE_SUCCESS.getMessage());

        return ResponseEntity.ok().body(ResponseCode.NOT_APPLY_COUPLE.getMessage());
    }

}
