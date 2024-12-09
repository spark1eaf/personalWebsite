package com.scottphebert.personalwebsite.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scottphebert.personalwebsite.common.Constants;
import com.scottphebert.personalwebsite.model.dto.DbCredentials;
import com.scottphebert.personalwebsite.service.utils.SecretsService;
import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    private static final Logger logger = LoggerFactory.getLogger(DataSourceConfig.class);

    private final SecretsService secretsService;

    public DataSourceConfig(SecretsService secretsService) {
        this.secretsService = secretsService;
    }

    @Bean
    @Profile(Constants.PROD_ENV)
    public DataSource getProdDataSource() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        //grab db credentials from AWS
        DbCredentials credentials = mapper.readValue(secretsService.getSecret(Constants.DB_SECRET_NAME), DbCredentials.class);

        // Set up the DataSource
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(Constants.DATASOURCE_DRIVER_CLASS);

        StringBuilder builder = new StringBuilder();
        builder.append(Constants.JDBC)
                .append(credentials.getEngine())
                .append(Constants.SEPARATOR)
                .append(credentials.getHost())
                .append(Constants.COLON)
                .append(credentials.getPort())
                .append(Constants.SLASH)
                .append(credentials.getDbname());
        dataSource.setUrl(builder.toString());
        dataSource.setUsername(credentials.getUsername());
        dataSource.setPassword(credentials.getPassword());

        return dataSource;
    }

    @Bean
    @Profile(Constants.DEV_EVN)
    public DataSource getDevDataSource() throws JsonProcessingException {
        Dotenv dotenv = Dotenv.load();
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(Constants.DATASOURCE_DRIVER_CLASS);
        dataSource.setUrl(Constants.DB_URL);
        dataSource.setUsername(dotenv.get(Constants.DB_USER));
        dataSource.setPassword(dotenv.get(Constants.DB_PASSWORD));

        return dataSource;
    }
}

