package com.moviebuster.moviebuster.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter //Annotation used to create getters methods for our variables
@Setter //Annotation used to create setters methods for our variables
@Entity //Used to specify in Spring application an entity that will be used for the DB
public class Movies {


//    @GeneratedValue(strategy = GenerationType.IDENTITY) //Method for the id
    @Id
    private Long id;

    private String title;

//    private String description;

//    private String genre;
//
//    private float movie_rating;
//
//    private String movie_date;
}
