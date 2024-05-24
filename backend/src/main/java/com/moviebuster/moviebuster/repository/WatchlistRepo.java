package com.moviebuster.moviebuster.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moviebuster.moviebuster.entity.Watchlist;

public interface WatchlistRepo extends JpaRepository <Watchlist, Long>{

}
