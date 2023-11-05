package io.chb.chb.domain.user;

public interface UserService {

    UserDTO findByUserId(String userId);

    boolean canUseId(String userId);
}
