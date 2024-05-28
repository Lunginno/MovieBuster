package com.moviebuster.moviebuster.auth;

import com.moviebuster.moviebuster.config.JwtService;
import com.moviebuster.moviebuster.entity.Role;
import com.moviebuster.moviebuster.entity.Users;
import com.moviebuster.moviebuster.repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

import static ch.qos.logback.classic.spi.ThrowableProxyVO.build;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepo repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<AuthenticationResponse> register(RegisterRequest request) {
        Optional<Users> existingUser = repository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body(AuthenticationResponse.builder().message("Email already registered").build());
        }

        Users user = Users.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
//        String jwtToken = jwtService.generateToken(user);
        var jwtToken = jwtService.generateTokenWithId(user, user.getId());
        return ResponseEntity.ok(AuthenticationResponse.builder()
                .token(jwtToken)
                .build());
    }

    public ResponseEntity<AuthenticationResponse> authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        Users user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found")); // Custom exception would be better
//        String jwtToken = jwtService.generateToken(user);
        var jwtToken = jwtService.generateTokenWithId(user, user.getId());
        return ResponseEntity.ok(AuthenticationResponse.builder()
                .token(jwtToken)
                .build());
    }
    public Users getUserWithFavMovies(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

//    public Users getUserById(Long id) {
//        return repository.findById(Math.toIntExact(id))
//                .orElseThrow(() -> new EntityNotFoundException("User not found"));
//                .build());
//    }
}
