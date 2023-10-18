package io.chb.chb.domain.couple;


import io.chb.chb.domain.user.UserDTO;

public interface CoupleService {

    void applyBeCouple(CoupleDTO userInfo);
    void updateUserForCouple(CoupleDTO couple);
    void createNewCouple(CoupleDTO couple);

    CoupleDTO getCoupleStatusByUserId(String userId);

}
