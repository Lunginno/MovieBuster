package com.moviebuster.moviebuster.auth;


import com.moviebuster.moviebuster.entity.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {


    private final AuthenticationService service;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }


    @GetMapping("/api/v1/user/{id}")
    public Users getUserWithFavMovies(@PathVariable Integer id) {
        return service.getUserWithFavMovies(id);
    }

    @GetMapping("/api/v1/user/watchlist{id}")
    public Users getUserWithWatchlistMovie(@PathVariable Integer id){
        return service.getUserWithWatchlist(id);
    }

//    @GetMapping ("/api/v1/user-watchlist/{id}")
//        public Users getUserWithWatchlist(@PathVariable Integer id){
//        return service.geUserWithWatchlist(id);
//    }
}
