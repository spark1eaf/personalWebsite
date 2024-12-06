package com.scottphebert.personalwebsite.common;

public final class Constants {

    private Constants(){}

    //endpoints
    public static final String SITE_URL = "/site";
    public static final String REGISTRATION_URL = "/register";
    public static final String LOGIN_URL = "/login";
    public static final String SIGN_OUT_URL = "/signout";
    public static final String CHANGE_PASSWORD_URL = "/changepass";
    public static final String PASSWORD_RECOVERY_URL = "/recovery";
    public static final String GET_USER_DETAILS_URL = "/getuserdetails";
    //exceptions and error handling
    public static final String USER_NOT_FOUND_EMAIL = "No user present with email: ";
    public static final String USER_NOT_FOUND_USERNAME = "No user present with username: ";
    public static final String USER_ALREADY_EXISTS = "User already exists for this email.";
    public static final String USERNAME_TAKEN = "Username already exists.";
    public static final String USER_DETAILS_NOT_FOUND = "User details not found for user with id: ";
    //user management
    public static final String REGISTRATION_SUCCESS = "User registered successfully";
    public static final String REGISTRATION_FAILURE = "An error occurred during registration";
    public static final String UPDATE_PASSWORD_SUCCESS = "Password was successfully changed";
    public static final String UPDATE_PASSWORD_FAILURE = "An error occurred while attempting to update password";
    //security
    public static final String TOKEN_INVALIDATED = "Token has been invalidated";
    public static final String INVALID_TOKEN = "Invalid token";
    public static final String BEARER = "Bearer ";
    public static final String AUTHORIZATION = "Authorization";
    //todo keep it flexible???
    public static final long TOKEN_EXP_TIME = 3600000;
    public static final String JWT_SECRET = "JWT_SECRET";
    public static final String ENCODING_ALGO = "HmacSHA512";
    //Logging
    public static final String REGISTRATION_SUCCESS_LOG = "Registration successful for user: {}";
    public static final String EMAIL_ALREADY_EXISTS_LOG = "Email already exists: {}";
    public static final String USERNAME_TAKEN_LOG = "Username already exists: {}";
    public static final String REGISTRATION_FAILED = "An error occurred while registering user: {}";
    public static final String PASSWORD_UPDATE_SUCCESS_LOG = "Password updated for user associated with email: {}";
    public static final String PASSWORD_UPDATE_FAIL_LOG = "An error occurred while attempting to update password for user associated with email: {}";
    public static final String LOGIN_SUCCESSFUL_LOG = "Login successful for user: {}";
    public static final String LOGIN_FAILED_LOG = "Login failed for user: {}";
    public static final String INVALID_SIGNOUT_TOKEN_LOG = "Invalid sign in token: {}";
    public static final String SIGN_OUT_SUCCESS_LOG = "Token blacklisted successfully: {}";
    public static final String USER_DETAILS_SUCCESS_LOG = "User details retrieved for user: {}";
    public static final String USER_DETAILS_FAIL_LOG = "Unable to fetch user details for user: {}";
    public static final String REGISTRATION_REQUEST_LOG = "Registration request for email: {}";
    public static final String LOGIN_REQUEST_LOG = "Login request for username: {}";
    public static final String SIGNOUT_REQUEST_LOG = "Sign out request with token: {}";
    public static final String CHANGE_PASSWORD_REQUEST_LOG = "Password change request for user associated with email: {}";
    public static final String RECOVERY_EMAIL_REQUEST_LOG = "Password recovery requested for email: {}";
    public static final String USER_DETAILS_REQUEST_LOG = "User details request for user: {}";
    public static final String AUTH_MISMATCH_LOG = "Authorizing user {} does not match user from request";
    public static final String TOKEN_EXPIRED_LOG = "Token: {} has expired: ";
    public static final String INVALID_TOKEN_LOG = "Token: {} is invalid";
}
