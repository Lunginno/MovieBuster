package com.moviebuster.moviebuster.controller;

import com.moviebuster.moviebuster.auth.AuthenticationService;
import com.moviebuster.moviebuster.entity.Users;
import com.moviebuster.moviebuster.entity.WatchlistMovie;
import com.moviebuster.moviebuster.repository.UserRepo;
import com.moviebuster.moviebuster.repository.WatchlistRepo;
import com.moviebuster.moviebuster.service.WatchlistServiceImplement;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping ("/api/v1/auth/movies/watchlist")
public class WatchlistController {

    @Autowired
    private WatchlistServiceImplement watchlistServiceImplement;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private WatchlistRepo watchlistRepo;

    @Autowired
    private AuthenticationService userService;

    @GetMapping
    public List<WatchlistMovie> findall(){
        return watchlistServiceImplement.getAllMovies();
    }

    @PostMapping
    public void saveMovie (@RequestBody WatchlistMovie watchlistMovie, @RequestParam Integer userId){
        Users user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("This user has not been found"));

        List<WatchlistMovie> existingMovies = watchlistServiceImplement.getMoviesByTitle(watchlistMovie.getTitle());

        boolean userHasMovie = existingMovies.stream()
                .anyMatch(existingMovie -> existingMovie.getUser().getId().equals(userId));

        if (userHasMovie){
            throw new RuntimeException("User with Id" + userId + "already has the movie with the title" + watchlistMovie.getTitle() + " ");
        }

        watchlistMovie.setUser(user);

        watchlistServiceImplement.saveMovie(watchlistMovie, userId);
    }

    @GetMapping("/user/{userId}")
    public List<WatchlistMovie> getMoviesByUserId (@PathVariable Integer userId){
        return watchlistServiceImplement.getMoviesByUserId(userId);
    }

    @GetMapping("{id}")
    public  WatchlistMovie findOneById(@PathVariable Long id){
        return watchlistServiceImplement.getWatchlistMovieById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        watchlistServiceImplement.deleteWatchlistMovie(id);
    }
}
