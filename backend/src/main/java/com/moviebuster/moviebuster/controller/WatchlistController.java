package com.moviebuster.moviebuster.controller;

import java.util.List;

import org.apache.catalina.authenticator.SpnegoAuthenticator.AuthenticateAction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import com.moviebuster.moviebuster.auth.AuthenticationService;
import com.moviebuster.moviebuster.entity.Users;
import com.moviebuster.moviebuster.entity.Watchlist;
import com.moviebuster.moviebuster.repository.UserRepo;
import com.moviebuster.moviebuster.repository.WatchlistRepo;
import com.moviebuster.moviebuster.service.WatchlistServiceImplementation;

import jakarta.persistence.EntityNotFoundException;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/auth/wacthlist")
public class WatchlistController {

    @Autowired
    private WatchlistServiceImplementation watchserviceImplement;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private WatchlistRepo watchlistRepo;

    @Autowired
    private AuthenticationService userService;


    @GetMapping
    public List<Watchlist> findall(){
        return watchserviceImplement.geWatchlists();
    }

    @PostMapping
    public void saveMovie(@RequestBody Watchlist watchlist, @RequestParam Integer userId){

        Users user = userRepo.findById(userId)
        .orElseThrow(() -> new EntityNotFoundException("User not found"));

        watchserviceImplement.saveMovie(watchlist, userId);
    }

    @GetMapping("/{id}")
    public Watchlist findOneById(@PathVariable Long id){
        return watchserviceImplement.getWatchlistById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        this.watchlistRepo.deleteById(id);
    }

    //Soft Delete
    @DeleteMapping("softD/{id}")
    public void deleteWatchlistMovieById(@PathVariable Integer id) {
        watchserviceImplement.deleteWatchlistMovieById(id);
    }



    // @PostMapping("/{userId}/add/{movieId}")
    // public void addToWatchlist (@PathVariable Integer userId, @PathVariable Long movieId){
    //     //Find the user by using their id
    //     Users user = userRepo.findById(userId)
    //     .orElseThrow(() -> new IllegalArgumentException("This user was not foound"));

    //     //create a new watchlist entry 
    //     Watchlist watchlist = new Watchlist();
    //     watchlist.setUser(user);

    //     watchlist.setMovie(movieRepo.getOne(movieId));

    //     watchlistRepo.save(watchlist);
    // }

    // @GetMapping("/{userId}")
    // public List<Watchlist> getWatchlistByUserId (@PathVariable Long userId){
    //     //Find the user by userId

    //     Users user = userRepo.findById(userId)
    //     .orElseThrow(() -> new IllegalArgumentException("User not found"));

    //     //Retrieve the watchlist entries for the user
    //     return user.getWatchlist();
    // }

    // @DeleteMapping("/{watchlistId}")
    // public void removeFromWatchlist(@PathVariable Long watchlistId){
    //     watchlistRepo.deletelById(watchlistId);
    // }




}
