package io.chb.chb.domain.couple;


public interface CoupleService {

    void applyBeCouple(CoupleDTO userInfo);
    void updateUserForCouple(CoupleDTO couple);
    void createNewCouple(CoupleDTO couple);

    CoupleDTO getCoupleStatusByUserId(String userId);

}
