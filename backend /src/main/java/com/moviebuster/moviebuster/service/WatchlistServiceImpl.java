package com.moviebuster.moviebuster.service;
import com.moviebuster.moviebuster.service.WatchlistServiceImpl;

import com.moviebuster.moviebuster.entity.Watchlist;
import com.moviebuster.moviebuster.repository.MovieDetailsRepo;
import com.moviebuster.moviebuster.repository.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchlistServiceImpl implements WatchlistService {

    @Autowired
    private MovieDetailsRepo MovieRepo;

    @Override
    public List<Watchlist> getWatchlistMovies() {
        return List.of();
    }

    @Override
    public void saveWatchlistMovie(Watchlist watchlist) {
        this.MovieRepo.save(watchlist);
    }
}
