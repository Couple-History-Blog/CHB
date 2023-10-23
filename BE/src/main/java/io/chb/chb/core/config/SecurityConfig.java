package io.chb.chb.core.config;

import io.chb.chb.core.util.WebUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@AllArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private WebUtil webUtil;

    /*
    authorizeRequest() : 인증, 인가가 필요한 URL 지정
    antMatchers(URL)
    authenticated() : 해당 URL에 진입하기 위해서 Authentication(인증, 로그인)이 필요함
    hasAuthority() : 해당 URL에 진입하기 위해서 Authorization(인가, ex)권한이 ADMIN인 유저만 진입 가능)이 필요함
    URL에 ** 사용 : ** 위치에 어떤 값이 들어와도 적용시킴
    antMatchers(HttpMethod.POST, URL) : 이런 식으로 특정 HttpMethod만 검사 할 수도 있음
    anyRequest() : 그 외의 모든 URL
    permitAll() : Authentication, Authorization 필요 없이 통과
    formLogin() : Form Login 방식 적용
    usernameParameter() : 로그인할 때 사용되는 ID를 적어줌
    이 예제에서는 loginId로 로그인하기 때문에 따로 적어줘야 함
    만약 userName으로 로그인을 한다면 적어주지 않아도 됨
    passwordParameter() : 로그인할 때 사용되는 password를 적어줌
    이 예제에서는 password로 로그인하기 때문에 따로 적어주지 않아도 됨
    loginPage() : 로그인 페이지 URL
    defaultSuccessURL() : 로그인 성공 시 이동할 URL
    failureURL() : 로그인 실패 시 이동할 URL
    logout() : 로그아웃에 대한 정보
    */


    private static String WEB_MAIN_URL;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        WEB_MAIN_URL = webUtil.buildMainUrl();
        http.cors().and().csrf().disable()
                .authorizeRequests()
                    .antMatchers("/chb/sign-in").permitAll()
                    .antMatchers("/chb/sign-up").permitAll()
                    .antMatchers("/chb/test").permitAll()
                    .antMatchers("/chb/adminTest").hasRole("ADMIN")
                    .anyRequest().authenticated()
                .and()
                .formLogin()
                    .loginPage(webUtil.buildUrl(WEB_MAIN_URL, "/pages/login/login3"))
                    .defaultSuccessUrl(WEB_MAIN_URL)
                    .failureUrl(webUtil.buildUrl(WEB_MAIN_URL, "/pages/login/login3"))
                .and()
                .logout()
                    .logoutUrl("/chb/sign-out")
                    .logoutSuccessUrl(webUtil.buildUrl(WEB_MAIN_URL, "/pages/login/login3"))
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID");
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000"); // 모든 origin을 허용하거나 필요에 따라 원하는 origin을 설정
        configuration.addAllowedMethod(HttpMethod.POST.name()); // 모든 HTTP 메서드를 허용하거나 필요에 따라 원하는 메서드를 설정
        configuration.addAllowedMethod(HttpMethod.GET.name());
        configuration.addAllowedHeader("*"); // 모든 헤더를 허용하거나 필요에 따라 원하는 헤더를 설정

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 경로에 대해 CORS 설정을 적용

        return source;
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
