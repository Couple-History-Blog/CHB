package io.chb.chb.domain.login;

import io.chb.chb.domain.user.UserDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface LoginMapper {

    void signUp(UserDTO userInfo);

}
