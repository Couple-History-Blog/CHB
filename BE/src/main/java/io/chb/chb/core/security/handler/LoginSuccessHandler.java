package io.chb.chb.core.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.chb.chb.core.security.UserAuthority;
import io.chb.chb.domain.user.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.modelmapper.ModelMapper;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final ObjectMapper objectMapper;
    private final ModelMapper modelMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        response.setStatus(HttpStatus.OK.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());

        UserAuthority userAuthority = (UserAuthority) authentication.getPrincipal();
        UserDTO user = userAuthority.getUser();
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);

        objectMapper.writeValue(response.getWriter(), userDTO);
    }

}