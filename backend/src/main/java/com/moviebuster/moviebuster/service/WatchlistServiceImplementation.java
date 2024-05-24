package com.moviebuster.moviebuster.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moviebuster.moviebuster.entity.Users;
import com.moviebuster.moviebuster.entity.Watchlist;
import com.moviebuster.moviebuster.repository.UserRepo;
import com.moviebuster.moviebuster.repository.WatchlistRepo;

@Service
public class WatchlistServiceImplementation implements WatchlistService{


    @Autowired
    private WatchlistRepo watchlistRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public List<Watchlist> geWatchlists(){
        return watchlistRepo.findAll();
    }

    @Override
    public void saveMovie(Watchlist movie, Integer userId){

        Users user = userRepo.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Watchlist.save(movie);
    }

    @Override
    public Watchlist getWatchlistById(Long id){
        Optional<Watchlist> optional = watchlistRepo.findById(id);

        Watchlist watchlist;

        if(optional.isPresent()){
            watchlist = optional.get();
        } else {
            throw new RuntimeException("The id is not found");
        }

        return watchlist;
    }

    @Override
    public void deleteWatchlistMovie(Long id){
        this.watchlistRepo.deleteById(id);
    }

}
