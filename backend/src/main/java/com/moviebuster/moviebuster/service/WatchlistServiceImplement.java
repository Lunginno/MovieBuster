package com.moviebuster.moviebuster.service;

import com.moviebuster.moviebuster.entity.Users;
import com.moviebuster.moviebuster.entity.WatchlistMovie;
import com.moviebuster.moviebuster.repository.UserRepo;
import com.moviebuster.moviebuster.repository.WatchlistRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WatchlistServiceImplement implements WatchlistService {

//    @Autowired
//    private WatchlistMovie watchlistMovie;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private WatchlistRepo watchlistRepo;

    @Override
    public List<WatchlistMovie> getAllMovies(){
        return watchlistRepo.findAll();
    }

    @Override
    public  void saveMovie (WatchlistMovie watchlistMovie, Integer userId)
    {
        Users user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user Id"));

        watchlistRepo.save(watchlistMovie);
    }

    @Override
    public WatchlistMovie getWatchlistMovieById(Long id){
        Optional<WatchlistMovie> optional = watchlistRepo.findById(id);
        WatchlistMovie watchlistMovie;

        if (optional.isPresent()){
            watchlistMovie = optional.get();
        }
        else {
            throw new RuntimeException("Todo for the id" + id + "is not found");
        }
        return watchlistMovie;
    }

    @Override
    public List<WatchlistMovie> getMoviesByUserId(Integer userId)
    {
        return  watchlistRepo.findMoviesByUserId(userId);
    }

    @Override
    public List<WatchlistMovie> getMoviesByTitle(String title) {
        return watchlistRepo.findByTitle(title);
    }

    @Override
    public Optional<WatchlistMovie> getMovieByTitleAndUserId(String title, Integer userId) {
        return watchlistRepo.findByTitleAndUserId(title, userId);
    }

    @Override
    @Transactional
    public void deleteWatchlistMovie(Long id) {
        watchlistRepo.deleteById(id);
    }
//
//    @Override
//    public List<WatchlistMovie> getMoviesByTitleAndUserId(String title, Integer userId){
//        return watchlistRepo.findMoviesByUserId(title, userId);
//    }

//    @Override
//    @Transactional
//    public void deleteFavMovie(Long id){
//        watchlistRepo.deleteById(id);
//    }

}
