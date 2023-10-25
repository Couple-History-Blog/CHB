package io.chb.chb.core.security;

import io.chb.chb.core.config.CorsConfig;
import io.chb.chb.core.config.jwt.JwtAuthenticationFilter;
import io.chb.chb.core.config.jwt.JwtTokenProvider;
import io.chb.chb.core.security.handler.LoginSuccessHandler;
import io.chb.chb.core.security.handler.LogoutSuccessHandler;
import io.chb.chb.core.util.WebUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@AllArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private WebUtil webUtil;
    private final JwtTokenProvider jwtTokenProvider;
    private final CorsConfig corsConfig;
    private final LoginSuccessHandler loginSuccessHandler;
    private final LogoutSuccessHandler logoutSuccessHandler;
    private static String WEB_MAIN_URL;


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


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // /http://localhost:7200/chb
        WEB_MAIN_URL = webUtil.buildMainUrl();

        http.cors().configurationSource(corsConfig.corsConfigurationSource())
                .and()
                .csrf().disable();

        http.formLogin()                                                            /* [ 로그인 관련 설정 부분 ] */
//                .loginPage(webUtil.buildUrl(WEB_MAIN_URL, "/login"))                                            // 로그인 페이지 설정
//                .loginProcessingUrl("/chb/sign-in")                                 // 로그인 처리 URL
                .successHandler(loginSuccessHandler)
                .defaultSuccessUrl(WEB_MAIN_URL)                                    // 로그인 성공시 URL (WEB_MAIN_URL로만 해야 됨)
                .failureUrl(webUtil.buildUrl(WEB_MAIN_URL, "/login"));   // 로그인 실패시 URL

        http.logout()                                                               /* [ 로그아웃 관련 설정 부분 ] */
                .logoutUrl("/chb/sign-out")                                         // 로그아웃 처리 URL
                .invalidateHttpSession(true)                                        // 세션 무효화
                .clearAuthentication(true)                                          // 인증정보 삭제
                .deleteCookies("JSESSIONID", "rememberMe")                          // 로그아웃 이후 Cookie 삭제
                .logoutSuccessHandler(logoutSuccessHandler);                        // Logout 성공 후 Handler
//                .logoutSuccessUrl(webUtil.buildUrl(WEB_MAIN_URL, "/login")); // 로그아웃 성공시 URL

        http.rememberMe()                                                           /* [ 로그인 정보 저장 관련 설정 부분 ] */
                .rememberMeParameter("rememberMe")                                  // rememberMe 파라미터
                .rememberMeCookieName("rememberMe")                                 // Cookie 명칭
                .tokenValiditySeconds(3600)                                         // 로그인 정보 저장 시간 ( 1시간 )
                .alwaysRemember(false);                                             // 로그인 정보 항상 저장 여부 ( X )

        http.httpBasic().disable().authorizeRequests()                                                    /* [ 경로 허용 여부 관련 설정 ] */
                .antMatchers("/chb/login").permitAll()                  // 로그인 페이지 ( 권한 X --> 접근 허용 )
                .antMatchers("/chb/sign-in").permitAll()                // 로그인 로직  ( 권한 X --> 접근 허용 )
                .antMatchers("/chb/register").permitAll()               // 회원가입 페이지 ( 권한 X --> 접근 허용 )
//                .antMatchers("/chb/join").permitAll()                   // 회원가입 페이지 ( 권한 X --> 접근 허용 )
                .antMatchers("/chb/sign-up").permitAll()                // 회원가입 로직   ( 권한 X --> 접근 허용 )
                .antMatchers("http://localhost:7200/chb/dashboard/analytics").hasRole("ADMIN") // 테스트용
                .antMatchers("http://localhost:7200/chb/dashboard/default").hasRole("USER") // 테스트용
                .antMatchers("/swagger-ui/**", "/swagger-resources/**", "/v2/api-docs/**").permitAll()
                .antMatchers("http://localhost:7200/chb/**").hasRole("USER");
//                .anyRequest().authenticated();

        http.httpBasic().disable()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider)
                        , UsernamePasswordAuthenticationFilter.class)               // JwtAuthenticationFilter를 UsernamePasswordAuthenticationFilter 전에 넣는다
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);


        
        
        
/*
        http.cors().and().csrf().disable()
                .authorizeRequests()
//                    .antMatchers("/chb/sign-in").permitAll()
//                    .antMatchers("/chb/sign-up").permitAll()
//                    .antMatchers("/chb/test").permitAll()
                    .antMatchers("/chb/**").permitAll()
//                    .antMatchers("/chb/api/account/me").permitAll()
                    .antMatchers("/chb/adminTest").hasRole("ADMIN")
//                    .anyRequest().authenticated()
                .and()
                .formLogin()
//                    .loginPage(webUtil.buildUrl(WEB_MAIN_URL, "/login"))
                    .defaultSuccessUrl(WEB_MAIN_URL)
                    .failureUrl(webUtil.buildUrl(WEB_MAIN_URL, "/login"))
                .and()
                .logout()
                    .logoutUrl("/chb/sign-out")
                    .logoutSuccessUrl(webUtil.buildUrl(WEB_MAIN_URL, "/login"))
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class) // JwtAuthenticationFilter를 UsernamePasswordAuthenticationFilter 전에 넣는다
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);*/
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
