package com.scottphebert.personalwebsite.repo;

import com.scottphebert.personalwebsite.model.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WordRepo extends JpaRepository<Word, Long> {

    @Query("SELECT e.word FROM Word e WHERE e.id = :id")
    Optional<String> findWordById(long id);
}
