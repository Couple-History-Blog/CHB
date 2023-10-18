package io.chb.chb.domain.couple;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CoupleMapper {

    void applyBeCouple(CoupleDTO userInfo);
    void updateUserStatus(CoupleDTO couple);
    void updateUserCoupleYn(CoupleDTO couple);
    void createNewCouple(CoupleDTO couple);

    CoupleDTO getCoupleStatusByUserId(String userId);

}
