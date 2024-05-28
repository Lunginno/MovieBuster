package com.moviebuster.moviebuster.repository;

import com.moviebuster.moviebuster.entity.FavMovies;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavMovieRepo extends JpaRepository<FavMovies, Long> {

    @Query("SELECT f FROM FavMovies f WHERE f.deleted = 0")
    List<FavMovies> findAllActive();

    @Modifying
    @Transactional
    @Query("UPDATE FavMovies f SET f.deleted = 1 WHERE f.id = :id")
    void softDeleteById(Long id);

    @Query("SELECT f FROM FavMovies f WHERE f.deleted = 0 AND f.user.id = :userId")
    List<FavMovies> findActiveMoviesByUserId(Integer userId); // Rename method to match query intention

    List<FavMovies> findByTitle(String title);
}
