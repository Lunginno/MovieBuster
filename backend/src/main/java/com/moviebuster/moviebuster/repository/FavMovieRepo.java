package com.moviebuster.moviebuster.repository;

import com.moviebuster.moviebuster.entity.FavMovies;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavMovieRepo extends JpaRepository<FavMovies, Long> {

}
