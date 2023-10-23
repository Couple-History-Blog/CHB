package io.chb.chb.domain.user;

import io.chb.chb.core.exception.BaseException;
import io.chb.chb.core.exception.ErrorType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;


    @Override
    public UserDTO findByUserId(String userId) {
        return userMapper.findByUserId(userId);
    }

}
