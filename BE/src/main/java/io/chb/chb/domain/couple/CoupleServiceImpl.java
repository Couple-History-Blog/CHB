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

    public void updateUserBeCouple(CoupleDTO couple) {
        coupleMapper.updateWaitStatusBeCouple(couple);
        coupleMapper.updateUserBeCouple(couple);
        coupleMapper.createCoupleAccount(couple);
    }

}
