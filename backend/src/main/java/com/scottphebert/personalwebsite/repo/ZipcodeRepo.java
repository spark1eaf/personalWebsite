package com.scottphebert.personalwebsite.repo;

import com.scottphebert.personalwebsite.model.entity.Zipcode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ZipcodeRepo extends JpaRepository<Zipcode, String> {
    boolean existsByZip(String zip);
}

