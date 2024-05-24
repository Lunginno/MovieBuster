package com.moviebuster.moviebuster.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Transactional
@Getter
@Setter
@Entity
@Table(name = "watchlist")
public class Watchlist {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private FavMovies movie;

    // public static void save(Watchlist movie2) {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'save'");
    // }
}
