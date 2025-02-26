package com.example.api.domain.user.service;

import com.example.api.domain.user.dto.requestDto.LoginRequestDto;
import com.example.api.domain.user.dto.requestDto.SignupRequestDto;
import com.example.api.domain.user.dto.responseDto.LoginResponseDto;
import com.example.api.domain.user.dto.responseDto.SignupResponseDto;
import com.example.api.domain.user.entity.User;
import com.example.api.domain.user.repository.UserRepository;
import com.example.api.global.exception.ResourceNotFoundException;
import com.example.api.global.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public SignupResponseDto signup(SignupRequestDto requestDto) {
        if (userRepository.existsByUsername(requestDto.getUsername())) {
            throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
        }

        String encodedPassword = passwordEncoder.encode(requestDto.getPassword());

        User user = requestDto.toEntity(encodedPassword);

        return SignupResponseDto.from(userRepository.save(user));
    }


    @Transactional
    public LoginResponseDto login(LoginRequestDto requestDto) {
        if (!userRepository.existsByUsername(requestDto.getUsername())) {
            throw new ResourceNotFoundException("일치하는 아이디를 찾을 수 없습니다.");
        }

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                requestDto.getUsername(),
                requestDto.getPassword()
            )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenProvider.createToken(authentication);

        User user = userRepository.findByUsername(requestDto.getUsername())
            .orElseThrow(() -> new ResourceNotFoundException("일치하는 사용자를 찾을 수 없습니다."));

        return LoginResponseDto.from(user, jwt);
//        return new TokenResponseDto.from(jwt);
    }


    public boolean checkUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}
