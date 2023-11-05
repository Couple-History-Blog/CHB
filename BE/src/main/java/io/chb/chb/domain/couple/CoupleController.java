package io.chb.chb.domain.couple;

import io.chb.chb.core.ResponseCode;
import io.chb.chb.domain.user.UserDTO;
import io.chb.chb.domain.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/chb")
public class CoupleController {

    private final CoupleService coupleService;
    private final UserService userService;

    public CoupleController(CoupleService coupleService, UserService userService) {
        this.coupleService = coupleService;
        this.userService = userService;
    }

    // TODO 아이디로 커플 신청
    @PostMapping("/apply-couple-account")
    public ResponseEntity<String> coupleApplyUp(@RequestBody CoupleDTO userInfo) {

        coupleService.applyBeCouple(userInfo);

        return ResponseEntity.ok().body(ResponseCode.APPLY_COUPLE_SUCCESS.getMessage());
    }

    @GetMapping("/apply-couple-account")
    public ResponseEntity<String> coupleWaitPage(CoupleDTO couple) {
        CoupleDTO coupleInfo = coupleService.getCoupleStatusByUserId(couple.getUserId());

        if (coupleInfo.isOtherUserAcceptYn()) {
            coupleService.updateUserForCouple(couple);
            coupleService.createNewCouple(couple);
            return ResponseEntity.ok().body(ResponseCode.BE_COUPLE_SUCCESS.getMessage());
        }

        return ResponseEntity.ok().body(ResponseCode.NOT_APPLY_COUPLE.getMessage());
    }

    @GetMapping("/currentUser-gender")
    public ResponseEntity<String> getCurrentUserGender(@RequestParam(value = "userId", required = false) String userId) {
        UserDTO user = userService.findByUserId(userId);
        return ResponseEntity.ok().body(user.getUserSexType());
    }
}
