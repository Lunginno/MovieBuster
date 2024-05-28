package com.moviebuster.moviebuster.service;

import java.util.List;

import com.moviebuster.moviebuster.entity.Watchlist;

public interface WatchlistService {

    List<Watchlist> geWatchlists();
    public void saveMovie (Watchlist movie, Integer userId);
    Watchlist getWatchlistById(Long id); //getting the watchlist item by ID
    List<Watchlist> getMoviesByUserId(Integer userId);

//    List<Watchlist> getMovieTitle(String title);

    void deleteWatchlistMovieById(Long id);

    void deleteWatchlistMovie(Long id);

    List<Watchlist> getWatchlistMovieById(Integer id); //posting the watchlist item by id user_id


//    //Soft delete
//    public List<Watchlist> getWatchlistMovieById(Integer userId) {
//        return watchlistRepo.findByUserIdAndIsDeletedFalse(userId);
//    }




}
