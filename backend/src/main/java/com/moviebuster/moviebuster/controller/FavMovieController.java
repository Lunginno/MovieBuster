package com.moviebuster.moviebuster.controller;

import com.moviebuster.moviebuster.entity.Users;
import com.moviebuster.moviebuster.repository.FavMovieRepo;
import com.moviebuster.moviebuster.repository.UserRepo;
//import org.springframework.web.bind.annotation.;
import com.moviebuster.moviebuster.auth.AuthenticationService;
import com.moviebuster.moviebuster.entity.FavMovies;
import com.moviebuster.moviebuster.service.FavMovieService;
import com.moviebuster.moviebuster.service.FavMovieServiceImpl;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/auth/movies/favourite")
public class FavMovieController {

    @Autowired
    private FavMovieServiceImpl movieService;
    
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private FavMovieRepo favMovieRepo;

    @Autowired
    private AuthenticationService userService;

    @GetMapping
    public List<FavMovies> findall(){
        return movieService.getAllMovies();
    }


//    @PostMapping
//    public void saveMovie(@RequestBody FavMovies movie, @RequestParam Integer userId){
//        movieService.saveMovie(movie, userId);
//    }

    @PostMapping
    public void saveMovie(@RequestBody FavMovies movie, @RequestParam Integer userId) {
        Users user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Check if the user already has a movie with the same title
        movieService.getMovieByTitleAndUserId(movie.getTitle(), userId)
                .ifPresent(existingMovie -> {
                    throw new RuntimeException("User with ID '" + userId + "' already has the movie with the title '" + movie.getTitle() + "'");
                });

        movie.setUser(user);
        movieService.saveMovie(movie, userId);
    }

    @GetMapping("/user/{userId}")
    public List<FavMovies> getMoviesByUserId(@PathVariable Integer userId) {
        return movieService.getMoviesByUserId(userId);
    }

    @GetMapping("/{id}")
    public FavMovies findOneById(@PathVariable Long id)
    {return movieService.getFavMovieById(id);}



    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        movieService.deleteFavMovie(id);
    }

}
