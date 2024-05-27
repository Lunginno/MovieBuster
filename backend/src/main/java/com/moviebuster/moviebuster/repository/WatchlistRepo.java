package com.moviebuster.moviebuster.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.moviebuster.moviebuster.entity.Watchlist;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WatchlistRepo extends JpaRepository <Watchlist, Long>{
    List<Watchlist> findByUserId (Integer userId);

    //Soft delete elements
    List<Watchlist> findByUserIdAndIsDeletedFalse(Integer userId);

    @Modifying
    @Transactional
    @Query("UPDATE Watchlist w SET w.isDeleted = true WHERE w.id = :id")
    void softDeleteById(Integer id);

}
