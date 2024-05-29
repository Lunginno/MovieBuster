package com.moviebuster.moviebuster.service;


import com.moviebuster.moviebuster.entity.FavMovies;

import java.util.List;

public interface FavMovieService {

    // its getting all the movies from the api/database
    List<FavMovies> getAllMovies();
    public void saveMovie(FavMovies movie, Integer userId);
    FavMovies getFavMovieById(Long id);
    List<FavMovies> getMoviesByUserId(Integer userId);
    List<FavMovies> getMoviesByTitle(String title);
    void deleteFavMovie(Long id);
}
