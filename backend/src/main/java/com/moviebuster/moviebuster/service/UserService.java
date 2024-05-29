package com.moviebuster.moviebuster.service;

import com.moviebuster.moviebuster.entity.Users;

import java.util.Optional;

public interface UserService {
    Optional<Users> getUserByEmail(String email);
}
