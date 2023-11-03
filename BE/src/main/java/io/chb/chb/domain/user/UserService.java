package io.chb.chb.domain.user;

public interface UserService {

    UserDTO findByUserId(String userId);

    Boolean canUseId(String userId);
}
