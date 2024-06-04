package com.moviebuster.moviebuster.entity;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Transactional
@Getter
@Setter
@Entity
@Table(name = "watchlist_movies")
public class WatchlistMovie {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name= "id")
    @Id
    private Long id;

    private String title;

    private String backdrop_path;

    private String genre;

    private float movie_rating;

    private String movie_date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

}
