package com.moviebuster.moviebuster.service;

import com.moviebuster.moviebuster.entity.Movies;
import com.moviebuster.moviebuster.repository.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public Movies getMovieById(Long id) { Optional<Movies> Optional= MovieRepo.findById(id);
        Movies movie;
        if(Optional.isPresent()){
            movie=Optional.get();
        }else {
            throw new RuntimeException("Id not found");
        }
        return movie;
    }

    @Override     public void DeleteMovie(Long id) {
        this.MovieRepo.deleteById(id);
    }
}
