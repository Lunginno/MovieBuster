package com.moviebuster.moviebuster.controller;

import java.util.List;

import com.moviebuster.moviebuster.entity.FavMovies;
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

        // Fetch the user object based on the user ID
        Users user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));


        watchserviceImplement.saveMovie(watchlist, userId);
    }

//    //existing movie
//    @PostMapping
//    public void saveMovie(@RequestBody Watchlist watchlist, @RequestParam Integer userId) {
//        // Fetch the user object based on the user ID
//        Users user = userRepo.findById(userId)
//                .orElseThrow(() -> new EntityNotFoundException("User not found"));
//
//        // Fetch the list of movies by title
//        List<Watchlist> existingMovies = watchserviceImplement.getMoviesByTitle(watchlist.getMovie_title());
//
//        // Check if any of the existing movies belong to the specified user
//        boolean userHasMovie = existingMovies.stream()
//                .anyMatch(existingMovie -> existingMovie.getUser().getId().equals(userId));
//
//        if (userHasMovie) {
//            throw new RuntimeException("User with ID '" + userId + "' already has the movie with the title '" + watchlist.getMovie_title() + "'");
//        }
//
//        // Associate the movie with the user
//        watchlist.setUser(user);
//
//        // Save the movie with the userId
//        watchserviceImplement.saveMovie(watchlist, userId);
//    }


//    @GetMapping("/user/{userId}")
//    public List<Watchlist> getW

    @GetMapping("/user/{userId}")
    public List<Watchlist> getMoviesByUserId(@PathVariable Integer userId) {
        return watchserviceImplement.getMoviesByUserId(userId);
    }



    @GetMapping("/{id}")
    public Watchlist findOneById(@PathVariable Long id){
        return watchserviceImplement.getWatchlistById(id);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        this.watchlistRepo.deleteById(id);
    }


//    //Soft Delete
//    @DeleteMapping("softD/{id}")
//    public void deleteWatchlistMovieById(@PathVariable Integer id) {
//        watchserviceImplement.deleteWatchlistMovieById(id);
//    }




}
