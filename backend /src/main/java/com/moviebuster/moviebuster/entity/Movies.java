package com.moviebuster.moviebuster.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter //Annotation used to create getters methods for our variables
@Setter //Annotation used to create setters methods for our variables
@Entity //Used to specify in Spring application an entity that will be used for the DB
public class Movies {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Method for the id
    private Long id;

    private String title;

    private String description;

    private String genre;

    private float movie_rating;

    private String movie_date;
}


