package com.moviebuster.moviebuster.service;

import com.moviebuster.moviebuster.entity.FavMovies;
import com.moviebuster.moviebuster.entity.Users;
import com.moviebuster.moviebuster.repository.FavMovieRepo;
import com.moviebuster.moviebuster.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavMovieServiceImpl implements FavMovieService {

    @Autowired
    private FavMovieRepo FavMovieRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public List<FavMovies> getAllMovies(){
        return FavMovieRepo.findAll();
    }


//    @Override
//    public void saveMovie(FavMovies movie){
//        this.FavMovieRepo.save(movie);
//    }
    @Override
    public void saveMovie(FavMovies movie, Integer userId) {


        // Get the user object based on userId
        Users user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        // Set the user for the movie
//        movie.setUser(user);

        // Save the movie
        FavMovieRepo.save(movie);
    }


    @Override
    public FavMovies getFavMovieById(Long id) { //Return type of todo is expected
        Optional<FavMovies> optional = FavMovieRepo.findById(id);
        FavMovies favMovie;
        if(optional.isPresent()) {
            favMovie = optional.get();
        }
        else {
            throw new RuntimeException("Todo for the id " + id + " is not found");
        }

        return favMovie;
    }
    @Override
    public List<FavMovies> getMoviesByUserId(Integer userId) {
        return FavMovieRepo.findMoviesByUserId(userId);
    }

    @Override
    public List<FavMovies> getMoviesByTitle(String title) {
        return FavMovieRepo.findByTitle(title);
    }

    @Override
    @Transactional
    public void deleteFavMovie(Long id) {
        FavMovieRepo.deleteById(id);
    }

}
