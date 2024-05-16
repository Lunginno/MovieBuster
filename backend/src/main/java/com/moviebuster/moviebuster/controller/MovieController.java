package com.moviebuster.moviebuster.controller;

import com.moviebuster.moviebuster.repository.UserRepo;
//import org.springframework.web.bind.annotation.;
import com.moviebuster.moviebuster.auth.AuthenticationService;
import com.moviebuster.moviebuster.entity.Movies;
import com.moviebuster.moviebuster.service.MovieService;
import com.moviebuster.moviebuster.service.MovieServiceImpl;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/movies/favourite")
public class MovieController {

    @Autowired
    private MovieServiceImpl movieService;
    
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationService userService;

    @GetMapping
    public List<Movies> findall(){
        return movieService.getAllMovies();
    }

    @PostMapping
    public void saveMovie(@RequestBody Movies movie){
        movieService.saveMovie(movie);
    }

//    @PostMapping("/{userId}/favorite")
//    public void addToFavorite(@PathVariable Long userId, @RequestBody Movies movie){
//        User user = userService.findById(userId);
//        if (user != null) {
//            user.getFavoriteMovies().add(movie);
//            userService.saveUser(user);
//        }
//    }
//
//    @DeleteMapping("/{userId}/favorite/{movieId}")
//    public void removeFromFavorite(@PathVariable Long userId, @PathVariable Long movieId){
//        User user = userService.findById(userId);
//        if (user != null) {
//            user.getFavoriteMovies().removeIf(m -> movieId.equals(m.getId()));
//            userService.saveUser(user);
//        }
//    }

}
