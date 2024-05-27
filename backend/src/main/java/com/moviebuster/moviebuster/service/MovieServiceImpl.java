package com.moviebuster.moviebuster.service;

import com.moviebuster.moviebuster.entity.Movies;
import com.moviebuster.moviebuster.repository.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private  MovieRepo MovieRepo;

    @Override
    public List<Movies> getAllMovies(){
        return MovieRepo.findAll();
    }

    @Override
    public void saveMovie(Movies movie){
        this.MovieRepo.save(movie);
    }

//    @Override
//    public void deleteMovie(Long id){
//
//    }
//
//    public void getMovie(Long id){
//
//    }
}
