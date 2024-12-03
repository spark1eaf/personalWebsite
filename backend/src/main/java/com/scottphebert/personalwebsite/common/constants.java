package com.scottphebert.personalwebsite.common;

public final class Constants {

    private Constants(){}

    //endpoints
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
    public static final String INVALID_TOKEN = "Invalid token";

    //user management
    public static final String REGISTRATION_SUCCESS = "User registered successfully";
    public static final String PASSWORD_UPDATED = "Password has been updated.";
    public static final String SIGN_OUT_MESSAGE = "Logging out user with token: ";

    //security
    public static final String TOKEN_INVALIDATED = "Token has been invalidated";
    public static final String TOKEN_EXPIRED = "Token expired: ";
    public static final String BEARER = "Bearer ";
    public static final String AUTHORIZATION = "Authorization";
    public static final long TOKEN_EXP_TIME = 3600000;
    public static final String JWT_SECRET = "JWT_SECRET";
    public static final String ENCODING_ALGO = "HmacSHA512";
}
