package io.chb.chb.domain.user;

import java.util.Optional;

public interface UserService {

    UserDTO findByUserId(String userId);

}
