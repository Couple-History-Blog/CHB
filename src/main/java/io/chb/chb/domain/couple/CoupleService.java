package io.chb.chb.domain.couple;


import io.chb.chb.domain.user.UserDTO;

public interface CoupleService {

    void applyBeCouple(CoupleDTO userInfo);
    CoupleDTO getCoupleStatusByUserId(String userId);

}
