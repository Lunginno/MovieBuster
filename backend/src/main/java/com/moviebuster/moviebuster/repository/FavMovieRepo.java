package com.moviebuster.moviebuster.repository;

import com.moviebuster.moviebuster.entity.FavMovies;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavMovieRepo extends JpaRepository<FavMovies, Long> {

    List<FavMovies> findMoviesByUserId(Integer userId);
    List<FavMovies> findByTitle(String title);
}
