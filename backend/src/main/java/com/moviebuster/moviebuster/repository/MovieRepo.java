package com.moviebuster.moviebuster.repository;

import com.moviebuster.moviebuster.entity.Movies;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepo extends JpaRepository<Movies, Long> {
}
