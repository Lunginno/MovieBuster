package com.moviebuster.moviebuster.repository;

import com.moviebuster.moviebuster.entity.FavMovies;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavMovieRepo extends JpaRepository<FavMovies, Long> {
    List<FavMovies> findByUserId(Integer userId);
    List<FavMovies> findByTitle(String title);
}
