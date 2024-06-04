package com.moviebuster.moviebuster.repository;

import com.moviebuster.moviebuster.entity.WatchlistMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WatchlistRepo extends JpaRepository<WatchlistMovie, Long> {

    List<WatchlistMovie> findMoviesByUserId(Integer userId);
    List<WatchlistMovie> findByTitle (String title);

    @Query("SELECT f FROM WatchlistMovie f WHERE f.title = :title AND f.user.id = :userId")
    Optional<WatchlistMovie> findByTitleAndUserId(@Param("title") String title, @Param("userId") Integer userId);

}
