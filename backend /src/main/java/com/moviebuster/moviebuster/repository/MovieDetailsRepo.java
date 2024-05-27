package com.moviebuster.moviebuster.repository;

import com.moviebuster.moviebuster.entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieDetailsRepo extends JpaRepository<Watchlist, Long> {
}
