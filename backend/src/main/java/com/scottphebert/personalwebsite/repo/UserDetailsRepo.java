package com.scottphebert.personalwebsite.repo;

import com.scottphebert.personalwebsite.model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDetailsRepo extends JpaRepository<UserDetails, Long> {
    Optional<UserDetails> findByName(String name);

    Optional<UserDetails> findById(int id);
}
