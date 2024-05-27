package com.moviebuster.moviebuster.controller;

import com.moviebuster.moviebuster.entity.Users;
import com.moviebuster.moviebuster.repository.FavMovieRepo;
import com.moviebuster.moviebuster.repository.UserRepo;
//import org.springframework.web.bind.annotation.;
import com.moviebuster.moviebuster.auth.AuthenticationService;
import com.moviebuster.moviebuster.entity.FavMovies;
import com.moviebuster.moviebuster.service.FavMovieService;
import com.moviebuster.moviebuster.service.FavMovieServiceImpl;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/auth/movies/favourite")
public class FavMovieController {

    @Autowired
    private FavMovieServiceImpl movieService;
    
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private FavMovieRepo favMovieRepo;

    @Autowired
    private AuthenticationService userService;

    @GetMapping
    public List<FavMovies> findall(){
        return movieService.getAllMovies();
    }


//    @PostMapping
//    public void saveMovie(@RequestBody FavMovies movie, @RequestParam Integer userId){
//        movieService.saveMovie(movie, userId);
//    }

    @PostMapping
    public void saveMovie(@RequestBody FavMovies movie, @RequestParam Integer userId){

//        FavMovies existingMovies = movieService.getMoviesByTitle(movie.getTitle());
        List<FavMovies> existingMovies = movieService.getMoviesByTitle(movie.getTitle());

        if (!existingMovies.isEmpty()){
            throw new RuntimeException("Movie with the title '" + movie.getTitle() + "' already exists");
        }

        // Fetch the user object based on the user ID
        Users user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Associate the movie with the user
//        movie.setUser(user);
        // Save the movie
        movieService.saveMovie(movie, userId);
    }

    @GetMapping("/user/{userId}")
    public List<FavMovies> getMoviesByUserId(@PathVariable Integer userId) {
        return movieService.getMoviesByUserId(userId);
    }

    @GetMapping("/{id}")
    public FavMovies findOneById(@PathVariable Long id)
    {return movieService.getFavMovieById(id);}

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        this.favMovieRepo.deleteById(id);
    }

}
