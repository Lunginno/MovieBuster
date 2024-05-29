package com.moviebuster.moviebuster.service;


import com.moviebuster.moviebuster.entity.FavMovies;

import java.util.List;
import java.util.Optional;

public interface FavMovieService {

    // its getting all the movies from the api/database
    List<FavMovies> getAllMovies();
    public void saveMovie(FavMovies movie, Integer userId);
    FavMovies getFavMovieById(Long id);
    List<FavMovies> getMoviesByUserId(Integer userId);
    List<FavMovies> getMoviesByTitle(String title);
    public Optional<FavMovies> getMovieByTitleAndUserId(String title, Integer userId);
    void deleteFavMovie(Long id);
}
