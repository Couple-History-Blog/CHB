package io.chb.chb.domain.login;

import io.chb.chb.domain.user.UserDTO;

import java.util.Optional;

public interface LoginService {
    void signUp(UserDTO userInfo);

}
