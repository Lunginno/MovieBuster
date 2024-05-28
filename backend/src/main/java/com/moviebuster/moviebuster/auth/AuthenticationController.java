package com.moviebuster.moviebuster.auth;

import com.moviebuster.moviebuster.entity.Users;
import com.moviebuster.moviebuster.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@CrossOrigin("*")
//@CrossOrigin(origins = "http://localhost:8080/api/v1/auth")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return service.register(request);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request).getBody());
    }

    @GetMapping("/api/v1/user/{id}")
    public Users getUserWithFavMovies(@PathVariable Integer id) {
        return service.getUserWithFavMovies(id);

    }

    @CrossOrigin(origins = "http://localhost:8080/api/v1/auth")
    @GetMapping("/check-email")
    public ResponseEntity<?> checkIfUserExists(@RequestParam String email) {
        if (userService.getUserByEmail(email).isPresent()) {
            return ResponseEntity.ok().body(Collections.singletonMap("exists", true));
        } else {
            return ResponseEntity.ok().body(Collections.singletonMap("exists", false));
        }
    }
}





