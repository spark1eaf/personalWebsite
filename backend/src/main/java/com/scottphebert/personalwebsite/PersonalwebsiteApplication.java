package com.scottphebert.personalwebsite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PersonalwebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(PersonalwebsiteApplication.class, args);
	}

}
