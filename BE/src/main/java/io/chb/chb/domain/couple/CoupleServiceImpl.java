package io.chb.chb.domain.couple;

import org.springframework.stereotype.Service;

@Service
public class CoupleServiceImpl implements CoupleService {

    private final CoupleMapper coupleMapper;

    public CoupleServiceImpl(CoupleMapper coupleMapper) {
        this.coupleMapper = coupleMapper;
    }

    public void applyBeCouple(CoupleDTO userInfo) {
        coupleMapper.applyBeCouple(userInfo);
    }
    public void updateUserForCouple(CoupleDTO couple) {
        coupleMapper.updateUserStatus(couple);
        coupleMapper.updateUserCoupleYn(couple);
    }
    public void createNewCouple(CoupleDTO couple) {
        coupleMapper.createNewCouple(couple);
    }

    public CoupleDTO getCoupleStatusByUserId(String userId) {
        return coupleMapper.getCoupleStatusByUserId(userId);
    }

}
