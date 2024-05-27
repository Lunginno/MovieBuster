package com.moviebuster.moviebuster.auth;

import com.moviebuster.moviebuster.config.JwtService;
import com.moviebuster.moviebuster.entity.Role;
import com.moviebuster.moviebuster.entity.Users;
import com.moviebuster.moviebuster.repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepo repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = Users.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateTokenWithId(user, user.getId());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateTokenWithId(user, user.getId());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public Users getUserWithFavMovies(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Users getUserById(Long id) {
        return repository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

//    public Users geUserWithWatchlist(Integer id) {
//        return repository.findById(id)
//                .orElseThrow(()-> new RuntimeException("user not found"));
//    }
}
