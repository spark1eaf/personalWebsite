package com.scottphebert.personalwebsite.repo;

import com.scottphebert.personalwebsite.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

//    Boolean existsByUsername(String username);
//
//    Boolean existsByEmail(String email);
}
