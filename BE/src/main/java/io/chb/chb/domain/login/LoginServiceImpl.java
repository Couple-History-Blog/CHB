package io.chb.chb.domain.login;

import io.chb.chb.domain.user.UserDTO;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    private final LoginMapper loginMapper;

    public LoginServiceImpl(LoginMapper loginMapper) {
        this.loginMapper = loginMapper;
    }

    @Override
    public void signUp(UserDTO userInfo) {
        loginMapper.signUp(userInfo);
    }

}
