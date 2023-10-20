package io.chb.chb.domain.login;

import io.chb.chb.domain.user.UserDTO;

public interface LoginService {
    void signUp(UserDTO userInfo);

}
