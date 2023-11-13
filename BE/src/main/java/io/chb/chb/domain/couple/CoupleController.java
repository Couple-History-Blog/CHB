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

    @PostMapping("/accept-be-couple")
    public ResponseEntity<?> acceptCoupleAccount(@RequestBody CoupleDTO userInfo) {

        userInfo.setOtherUserId(userService.getOtherUserId(userInfo.getUserId()));
        coupleService.updateUserBeCouple(userInfo);

        return ResponseEntity.ok().body(true);
    }

    // TODO 아이디로 커플 신청
    @PostMapping("/apply-couple-account")
    public ResponseEntity<String> coupleApplyUp(@RequestBody CoupleDTO userInfo) {

        coupleService.applyBeCouple(userInfo);

        return ResponseEntity.ok().body(ResponseCode.APPLY_COUPLE_SUCCESS.getMessage());
    }


    @GetMapping("/currentUser-gender")
    public ResponseEntity<String> getCurrentUserGender(@RequestParam(value = "userId", required = false) String userId) {
        UserDTO user = userService.findByUserId(userId);
        return ResponseEntity.ok().body(user.getUserSexType());
    }
}
