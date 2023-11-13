package io.chb.chb.domain.couple;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CoupleMapper {

    void applyBeCouple(CoupleDTO userInfo);
    void updateWaitStatusBeCouple(CoupleDTO couple);
    void updateUserBeCouple(CoupleDTO couple);
    void createCoupleAccount(CoupleDTO couple);

    CoupleDTO getCoupleStatusByUserId(String userId);

}
