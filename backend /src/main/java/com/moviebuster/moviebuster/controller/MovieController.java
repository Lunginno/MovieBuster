package com.moviebuster.moviebuster.controller;

//import org.springframework.web.bind.annotation.;
import com.moviebuster.moviebuster.entity.Movies;
import com.moviebuster.moviebuster.service.MovieService;
import com.moviebuster.moviebuster.service.MovieServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/movies/favourite")
public class MovieController {

    @Autowired
    private MovieServiceImpl movieService;

    @GetMapping
    public List<Movies> findall(){
        return movieService.getAllMovies();
    }

    @PostMapping
    public void saveMovie(@RequestBody Movies movie){
        movieService.saveMovie(movie);
    }


}
