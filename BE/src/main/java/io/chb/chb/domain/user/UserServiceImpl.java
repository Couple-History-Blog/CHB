package io.chb.chb.domain.user;

import io.chb.chb.core.exception.BaseException;
import io.chb.chb.core.exception.ErrorType;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    public UserServiceImpl (UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public UserDTO findByUserId(String userId) {
        return Optional.ofNullable(userMapper.findByUserId(userId))
                .orElseThrow(() -> new BaseException(ErrorType.USER_NOT_EXIST));
    }

}
