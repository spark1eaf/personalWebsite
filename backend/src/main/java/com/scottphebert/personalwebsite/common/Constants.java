package com.scottphebert.personalwebsite.common;

public final class Constants {

    private Constants(){}

    //endpoints
    public static final String PREFIX = "/resources";
    public static final String REGISTRATION_URL = "/register";
    public static final String LOGIN_URL = "/login";
    public static final String LOGIN_STATUS_URL = "/getloginstatus";
    public static final String SIGN_OUT_URL = "/signout";
    public static final String CHANGE_PASSWORD_URL = "/changepass";
    public static final String PASSWORD_RECOVERY_URL = "/recovery";
    public static final String GET_USER_DETAILS_URL = "/getuserdetails";
    public static final String LOCATION_DETAILS_URL = "/locationdetails";
    public static final String WORDLE_ATTEMPT_URL = "/wordleattempt";
    public static final String GET_DAILY_WORD_URL = "/getdailyword";

    //exceptions and error handling
    public static final String USER_NOT_FOUND_EMAIL = "No user present with email: ";
    public static final String USER_NOT_FOUND_USERNAME = "No user present with username: ";
    public static final String INVALID_ZIPCODE= "Invalid zipcode provided.";
    public static final String USER_ALREADY_EXISTS = "User already exists for this email.";
    public static final String USERNAME_TAKEN = "Username already exists.";
    public static final String USER_DETAILS_NOT_FOUND = "User details not found for user with id: ";
    public static final String PARSING_FAILURE = "Failed to parse secret value";
    public static final String LOCATION_RETRIEVAL_FAILURE = "Failed to fetch location details: ";
    public static final String WORD_NOT_FOUND = "No word found for id: ";
    public static final String DAILY_WORD_NOT_FOUND = "No daily word found in scheduled data";

    //user management
    public static final String REGISTRATION_SUCCESS = "User registered successfully.";
    public static final String REGISTRATION_FAILURE = "An error occurred during registration.";
    public static final String UPDATE_PASSWORD_SUCCESS = "Password was successfully changed";
    public static final String UPDATE_PASSWORD_FAILURE = "An error occurred while attempting to update password";
    public static final String LOGGED_IN = "User is logged in.";
    public static final String NOT_LOGGED_IN = "User is not currently logged in.";

    //wordle
    public static final String ATTEMPT_LIMIT_REACHED = "User has already reached attempt limit for today.";
    public static final String INVALID_WORDLE_LENGTH = "Invalid Length, word must be of length 5.";
    public static final String PARTIAL_MATCH = "partial";
    public static final String FULL_MATCH = "full";
    public static final String NO_MATCH = "none";
    public static final String EXECUTE_DAILY_WORDLE_UPDATES = "Executing scheduled daily wordle updates. Time is: ";

    //security
    public static final String TOKEN_INVALIDATED = "Token has been invalidated";
    public static final String INVALID_TOKEN = "Invalid token";
    public static final String BEARER = "Bearer ";
    public static final String AUTHORIZATION = "Authorization";
    public static final String AUTH_TOKEN = "authToken";
    public static final String AWS_REGION = "us-east-1";
    public static final long TOKEN_EXP_TIME = 3600000;
    public static final String JWT_SECRET = "JWT_SECRET";
    public static final String ENCODING_ALGO = "HmacSHA512";

    //Logging
    public static final String REGISTRATION_SUCCESS_LOG = "Registration successful for user: {}";
    public static final String EMAIL_ALREADY_EXISTS_LOG = "Email already exists: {}";
    public static final String USERNAME_TAKEN_LOG = "Username already exists: {}";
    public static final String REGISTRATION_FAILED = "An error occurred while registering user: {} Exception: {}";
    public static final String PASSWORD_UPDATE_SUCCESS_LOG = "Password updated for user associated with email: {}";
    public static final String PASSWORD_UPDATE_FAIL_LOG = "An error occurred while attempting to update password for user associated with email: {} Exception: {}";
    public static final String LOGIN_SUCCESSFUL_LOG = "Login successful for user: {}";
    public static final String LOGIN_FAILED_LOG = "Login failed for user: {} Exception: {}";
    public static final String SIGN_OUT_SUCCESS_LOG = "Token blacklisted successfully: {}";
    public static final String USER_DETAILS_SUCCESS_LOG = "User details retrieved for user: {}";
    public static final String USER_DETAILS_FAIL_LOG = "Unable to fetch user details for user: {} Exception: {}";
    public static final String REGISTRATION_REQUEST_LOG = "Registration request for email: {}";
    public static final String LOGIN_REQUEST_LOG = "Login request for username: {}";
    public static final String SIGNOUT_REQUEST_LOG = "Sign out request with token: {}";
    public static final String CHANGE_PASSWORD_REQUEST_LOG = "Password change request for user associated with email: {}";
    public static final String RECOVERY_EMAIL_REQUEST_LOG = "Password recovery requested for email: {}";
    public static final String USER_DETAILS_REQUEST_LOG = "User details request for user: {}";
    public static final String AUTH_MISMATCH_LOG = "Authorizing user {} does not match user from request";
    public static final String TOKEN_EXPIRED_LOG = "Validation failed. Token: {} has expired: ";
    public static final String INVALID_TOKEN_LOG = "Token: {} is invalid";
    public static final String SECRET_RETRIEVAL_ERROR_LOG = "Error retrieving secret key: {}";
    public static final String LOGIN_STATUS_REQUEST_LOG = "Checking login status for user: {}";
    public static final String USER_NOT_LOGGED_ON_LOG = "User is not currently logged in: {}";
    public static final String USER_LOGGED_ON_LOG = "User is logged in: {}";
    public static final String LOCATION_REQUESTED_LOG = "location details requested for longitude and latitude: {}, {}";
    public static final String GEONAMES_API_ERROR_LOG = "Error response from GeoNames API: {}";
    public static final String INVALID_ZIPCODE_LOG = "Invalid US zipcode: {}";
    public static final String LOGIN_STATUS_UNAVAILABLE_LOG = "An error occured while fetching the login status for user: {} Exception: {}";
    public static final String USER_DETAILS_UPDATE_ERROR_LOG = "An error occurred while attempting to update userDetails for userId: {} Exception: {}";
    public static final String PROCESS_WORDLE_ATTEMPT_LOG = "Processing wordle attempt for user: {}";
    public static final String DAILY_WORD_REQUESTED_LOG = "Daily word requested by user: {}";

    //db
    public static final String DATASOURCE_DRIVER_CLASS = "com.mysql.cj.jdbc.Driver";
    public static final String DB_URL = "jdbc:mysql://localhost:3306/personalWebsite";
    public static final String JDBC = "jdbc:";
    public static final String DB_SECRET_NAME = "dbconnection";
    public static final String DB_USER = "DB_USER";
    public static final String DB_PASSWORD = "DB_PASSWORD";

    //profiles
    public static final String PROD_ENV = "prod";
    public static final String DEV_EVN = "dev";

    //misc
    public static final String SEPARATOR = "://";
    public static final String COLON = ":";
    public static final String SLASH = "/";

    //external api
    public static final String GEONAMES_URL = "http://api.geonames.org/timezoneJSON";
    public static final String LATITUDE_PARAM = "?lat=";
    public static final String LONGITUDE_PARAM = "&lng=";
    public static final String USERNAME_PARAM = "&username=";
    public static final String GEONAMES_API_KEY_NAME = "GEONAMES_USER";
}
