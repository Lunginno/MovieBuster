package com.moviebuster.moviebuster.repository;

import com.moviebuster.moviebuster.entity.FavMovies;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FavMovieRepo extends JpaRepository<FavMovies, Long> {

    List<FavMovies> findMoviesByUserId(Integer userId);
    List<FavMovies> findByTitle(String title);


    @Query("SELECT f FROM FavMovies f WHERE f.title = :title AND f.user.id = :userId")
    Optional<FavMovies> findByTitleAndUserId(@Param("title") String title, @Param("userId") Integer userId);
}
