package io.chb.chb.domain.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    UserDTO findByUserId(String userId);

    boolean canUseId(String userId);

    String getOtherUserId(String userId);
}
