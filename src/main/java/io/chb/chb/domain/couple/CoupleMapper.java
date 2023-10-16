package io.chb.chb.domain.couple;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CoupleMapper {

    CoupleDTO getCoupleStatusByUserId(String userId);

}
