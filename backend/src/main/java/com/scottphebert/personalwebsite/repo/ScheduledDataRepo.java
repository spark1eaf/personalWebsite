package com.scottphebert.personalwebsite.repo;

import com.scottphebert.personalwebsite.model.entity.ScheduledData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScheduledDataRepo extends JpaRepository<ScheduledData, Long> {

    @Query("SELECT e.wordleWord FROM ScheduledData e WHERE e.id = 1")
    Optional<String> findWordleWord();

    Optional<ScheduledData> findById(long id);
}
