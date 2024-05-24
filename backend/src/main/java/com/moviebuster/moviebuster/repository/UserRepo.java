package com.moviebuster.moviebuster.repository;

import com.moviebuster.moviebuster.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<Users, Integer> {
    Optional<Users> findByEmail(String email);
    Optional<Users> findById(Integer id);
}