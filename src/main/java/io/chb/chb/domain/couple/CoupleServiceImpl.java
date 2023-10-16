package io.chb.chb.domain.couple;

import org.springframework.stereotype.Service;

@Service
public class CoupleServiceImpl implements CoupleService {

    private final CoupleMapper coupleMapper;

    public CoupleServiceImpl(CoupleMapper coupleMapper) {
        this.coupleMapper = coupleMapper;
    }

    public void applyBeCouple(CoupleDTO userInfo) {
        return coupleMapper.applyBeCouple(userInfo);
    }
    public CoupleDTO getCoupleStatusByUserId(String userId) {
        return coupleMapper.getCoupleStatusByUserId(userId);
    }

}
