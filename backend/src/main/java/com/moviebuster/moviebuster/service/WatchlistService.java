package com.moviebuster.moviebuster.service;

import com.moviebuster.moviebuster.entity.WatchlistMovie;

import java.util.List;
import java.util.Optional;

public interface WatchlistService {

    List<WatchlistMovie> getAllMovies();
    public void saveMovie (WatchlistMovie wacthlistMovie, Integer userId);
    WatchlistMovie getWatchlistMovieById(Long id);
    List<WatchlistMovie> getMoviesByUserId(Integer userId);
    List<WatchlistMovie> getMoviesByTitle (String title);
    public Optional<WatchlistMovie> getMovieByTitleAndUserId(String title, Integer userId);
    void deleteWatchlistMovie(Long id);

}
