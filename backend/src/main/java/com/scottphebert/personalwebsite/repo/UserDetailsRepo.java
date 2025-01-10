package com.scottphebert.personalwebsite.repo;

import com.scottphebert.personalwebsite.model.entity.UserDetails;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserDetailsRepo extends JpaRepository<UserDetails, Long> {
    Optional<UserDetails> findById(long id);

    @Modifying
    @Transactional
    @Query("UPDATE UserDetails e set e.wordleAttemptLimitReached = false")
    void resetWordleAttemptLimits();
}
