package com.moviebuster.moviebuster.service;

import com.moviebuster.moviebuster.entity.Watchlist;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WatchlistService {

    List<Watchlist> getWatchlistMovies();

    void saveWatchlistMovie(Watchlist watchlist);
}
