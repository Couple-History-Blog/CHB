package io.chb.chb.domain.couple;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CoupleDTO {

    // 커플 계정 전용
    private String coupleId;
    private Date startCoupleDate;
    private Date coupleIngDate;

    private String userId;
    private String otherUserId;

    // 커플 계정 STATUS
    private boolean ownAcceptYn;
    private boolean otherAcceptYn;
}
