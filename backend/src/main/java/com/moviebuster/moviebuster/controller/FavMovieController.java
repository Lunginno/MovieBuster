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

    @GetMapping("/{id}")
    public  Movies findOneById(@PathVariable Long id)
    {
        return  movieService.getMovieById(id);
    }
//    @PutMapping("/{id}")
//    public void updateM(@PathVariable Long id,@RequestBody Movies movie)
//    {
//        this.movieService.updateMovies(id,movie);
//    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        this.movieService.DeleteMovie(id);
    }

}
