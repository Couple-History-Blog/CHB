package io.chb.chb.domain.user;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.ElementCollection;
import javax.persistence.FetchType;
import java.util.*;
import java.util.stream.Collectors;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO implements UserDetails {

    // 일반 계정 및 커플 계정 공용
    private String userId;
    private String userPassword;        // 인코딩 된 텍스트
    private String userName;
    private String userSexType;
    private String userNickName;

    // 일반 계정 전용
    private Boolean beCoupleYn;
    private String userRole;
    private Date userBrthDate;
    private String userMail;            // TODO 회원가입 때 로직 추가


    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    // Token 관리를 위함
    @Builder
    @Getter
    @AllArgsConstructor
    public static class TokenInfo {
        private String user;
        private String accessToken;
        private String refreshToken;
        private Long refreshTokenExpirationTime;
    }
    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
