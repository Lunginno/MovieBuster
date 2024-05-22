package com.moviebuster.moviebuster.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.apache.catalina.User;

import java.util.List;

@Getter //Annotation used to create getters methods for our variables
@Setter //Annotation used to create setters methods for our variables
@Entity //Used to specify in Spring application an entity that will be used for the DB
public class FavMovies {


//    @GeneratedValue(strategy = GenerationType.IDENTITY) //Method for the id
    @Id
    private Long id;

    private String title;

    private String description;

    private String genre;

    private float movie_rating;

    private String movie_date;


    // Define foreign key relationship with Users table
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users user;
//
//    @OneToMany(mappedBy = "fav_movies", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
//    private List<MovieItem> movies = new

}
