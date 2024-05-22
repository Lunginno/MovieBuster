package com.moviebuster.moviebuster.service;


import com.moviebuster.moviebuster.entity.Movies;

import java.util.List;

public interface MovieService {

    // its getting all the movies from the api/database
    List<Movies> getAllMovies();
    void saveMovie(Movies movie);
    Movies  getMovieById(Long id);
    void DeleteMovie(Long id);
//    void saveMovies(Movies movie);
}
