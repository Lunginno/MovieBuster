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

    private String movie_title;

    private String movie_genre;

    private String relDate;

    private float movie_rating;

//    //Soft delete start here
//    @Column(name ="is_Deleted")
//    private boolean isDeleted = false;
//    //End of soft delete

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;




//    //Getters and Setters for soft delete
//    public boolean isDeleted() {
//        return isDeleted;
//    }
//
//    public void setDeleted(boolean deleted) {
//        isDeleted = deleted;
//    }


}
