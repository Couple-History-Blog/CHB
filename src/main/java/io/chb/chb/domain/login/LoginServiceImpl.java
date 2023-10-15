package io.chb.chb.domain.login;

import io.chb.chb.core.exception.BaseException;
import io.chb.chb.core.exception.ErrorType;
import io.chb.chb.domain.user.UserDTO;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
