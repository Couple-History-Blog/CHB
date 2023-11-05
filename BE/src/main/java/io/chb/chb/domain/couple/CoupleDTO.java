package io.chb.chb.domain.couple;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CoupleDTO {

    // 커플 계정 전용
    private String coupleId;
    private Date beCoupleDate;
    private Date coupleIngDate;

    private String userId;
    private String otherUserId;

    // 커플 계정 STATUS
    private boolean ownUserAcceptYn;
    private boolean otherUserAcceptYn;
}
