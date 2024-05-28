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

////        FavMovies existingMovies = movieService.getMoviesByTitle(movie.getTitle());
//        List<FavMovies> existingMovies = movieService.getMoviesByTitle(movie.getTitle());
//
//        if (!existingMovies.isEmpty()){
//            throw new RuntimeException("Movie with the title '" + movie.getTitle() + "' already exists");
//        }

        // Fetch the user object based on the user ID
        Users user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Associate the movie with the user
//        movie.setUser(user);
        // Save the movie

        watchserviceImplement.saveMovie(watchlist, userId);
    }


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
