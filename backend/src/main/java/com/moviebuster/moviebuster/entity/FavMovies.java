package com.moviebuster.moviebuster.entity;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import jdk.jfr.TransitionTo;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.apache.catalina.User;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Data
@Transactional
@Getter //Annotation used to create getters methods for our variables
@Setter //Annotation used to create setters methods for our variables
@Entity //Used to specify in Spring application an entity that will be used for the DB
@Table(name = "fav_movies")
public class FavMovies {

    @GeneratedValue(strategy = GenerationType.AUTO) //Method for the id
    @Column(name = "movieId")
    @Id
    private Long movieId;

    private Long id;

    private String title;

    private String backdrop_path;

    private String genre;

    private float movie_rating;

    private String movie_date;

//    private int deleted = 0; // 0 means not deleted, 1 means deleted


    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;
//    private Integer userId;

//     Define foreign key relationship with Users table
//        @ManyToOne(fetch = FetchType.EAGER)
//        @JoinColumn(name = "user_id")
//        private Users user;


//    @OneToMany(mappedBy = "fav_movies")
//    private Set<Users> users ;

//    @OneToMany(mappedBy = "fav_movies", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
//    private List<MovieItem> movies ;

}
