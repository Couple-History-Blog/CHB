package io.chb.chb.core.security;

import io.chb.chb.domain.user.UserDTO;
import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

@Getter
public class UserAuthority extends User {

    private final UserDTO user;

    public UserAuthority(UserDTO user) {
        super(user.getUserId(), user.getUserPassword(), List.of(new SimpleGrantedAuthority(user.getUserRole())));
        this.user = user;
    }

}
