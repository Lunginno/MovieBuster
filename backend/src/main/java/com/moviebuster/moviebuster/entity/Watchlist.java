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

import java.time.LocalDateTime;
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

    @Column(name = "movie_title")
    private String movieTitle;

    private String image;

    private String release_date;

    private float movie_rating;

//    public String getMovie_title() {
//        return movie_title;
//    }
//
//    public void setMovie_title(String movie_title) {
//        this.movie_title = movie_title;
//    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

//    //Soft delete start here
//    @Column(name ="is_Deleted")
//    private boolean isDeleted = false;
//    //End of soft delete

//    //Getters and Setters for soft delete
//    public boolean isDeleted() {
//        return isDeleted;
//    }
//
//    public void setDeleted(boolean deleted) {
//        isDeleted = deleted;
//    }


}
