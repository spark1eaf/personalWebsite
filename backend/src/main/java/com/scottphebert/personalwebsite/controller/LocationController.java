package com.scottphebert.personalwebsite.controller;

import com.scottphebert.personalwebsite.common.Constants;
import com.scottphebert.personalwebsite.model.dto.LocationDetails;
import com.scottphebert.personalwebsite.service.utils.SecretsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(Constants.PREFIX)
public class LocationController {

    private static final Logger logger = LoggerFactory.getLogger(LocationController.class);

    @Autowired
    SecretsService secretsService;

    @GetMapping(Constants.LOCATION_DETAILS_URL)
    public Mono<LocationDetails> getLocationDetails(@RequestParam String longitude, @RequestParam String latitude){
        logger.info(Constants.LOCATION_REQUESTED_LOG, longitude, latitude);
        WebClient client = WebClient.create();

        StringBuilder url = new StringBuilder();
        url.append(Constants.GEONAMES_URL)
                .append(Constants.LATITUDE_PARAM)
                .append(latitude)
                .append(Constants.LONGITUDE_PARAM)
                .append(longitude)
                .append(Constants.USERNAME_PARAM)
                .append(secretsService.getSecret(Constants.GEONAMES_API_KEY_NAME));

        return client
                .get()
                .uri(url.toString())
                .retrieve()
                .onStatus(HttpStatusCode::isError, clientResponse -> {
                    logger.error(Constants.GEONAMES_API_ERROR_LOG, clientResponse.statusCode());
                    return clientResponse.bodyToMono(String.class)
                            .flatMap(errorBody -> Mono.error(new RuntimeException(
                                    Constants.LOCATION_RETRIEVAL_FAILURE + errorBody)));
                })
                .bodyToMono(LocationDetails.class);
    }
}
