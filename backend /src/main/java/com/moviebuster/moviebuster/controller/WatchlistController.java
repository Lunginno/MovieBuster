package com.moviebuster.moviebuster.controller;


import com.moviebuster.moviebuster.entity.Movies;
import com.moviebuster.moviebuster.entity.Watchlist;
import com.moviebuster.moviebuster.service.MovieServiceImpl;
import com.moviebuster.moviebuster.service.WatchlistServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/watchlist")
public class WatchlistController {

    @Autowired
    private WatchlistServiceImpl WatchlistService;

    @PostMapping
    public void saveMovie(@RequestBody Watchlist Watchlist) { WatchlistService.saveWatchlistMovie(Watchlist); }


}
