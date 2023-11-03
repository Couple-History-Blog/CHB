package io.chb.chb.domain.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    UserDTO findByUserId(String userId);

    Boolean canUseId(String userId);
}
