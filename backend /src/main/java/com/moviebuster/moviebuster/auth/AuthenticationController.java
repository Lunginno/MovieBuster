package com.moviebuster.moviebuster.auth;

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
    public ResponseEntity<ResponseEntity<AuthenticationResponse>> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
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





