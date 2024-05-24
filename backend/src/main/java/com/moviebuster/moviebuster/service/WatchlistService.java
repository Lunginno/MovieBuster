package com.moviebuster.moviebuster.service;

import java.util.List;

import com.moviebuster.moviebuster.entity.Watchlist;

public interface WatchlistService {

    List<Watchlist> geWatchlists();
    public void saveMovie (Watchlist movie, Integer userId);
    Watchlist getWatchlistById(Long id);
    void deleteWatchlistMovie(Long id);


}
