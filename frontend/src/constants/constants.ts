
export const DUMMY_TEXT = `Lorem ipsum dolor sit amet. Est doloribus sunt ut quibusdam quidem quo voluptatum debitis eos officia natus non voluptatum reiciendis et libero labore. Et tenetur unde aut eius doloribus et cupiditate pariatur ut facere natus est ipsa labore.
Aut quos cumque qui saepe commodi ex veniam accusamus qui aperiam enim vel quia voluptatem et quod quas. In fugit eaque est veritatis porro et temporibus placeat ex reiciendis adipisci est repudiandae aspernatur. Et dolorem modi est explicabo quam ut omnis nostrum aut quia neque cum molestias ipsum.
Et alias minima ex fugit ullam ut tempore itaque. Nam dicta neque sed ipsa optio ut magni consequatur sit unde sint non itaque velit? Eum atque quia et suscipit delectus aut exercitationem quia et officiis accusamus et nemo obcaecati 33 animi pariatur et iusto voluptatum! Cum soluta totam eum culpa minima ex quibusdam nihil ut quia cumque sed incidunt veniam hic quos galisum aut repudiandae praesentium.`;
export const ABOUT_TEXT_PREFIX = `Current site Features:`;

export const ABOUT_TEXT_LOGIN = `Full registration and login functionality along with the ability to log in with guest account. Password change and account recovery are planned features but are yet to be implemented.`;
export const ABOUT_TEXT_WEATHER = `Ability to get the current weather along with the weekly forecast in cities across the US (provides your home location's forecast by default). Does not work for Hawaii unfortunately.`;
export const ABOUT_TEXT_WORDLE = `Ability to attempt to solve site's daily wordle challenges. Complete with tracking user's current and highest streaks.`
export const RECOVERY_TEXT = `Please provide the email address linked to your account below and you will recieve a recovery email shortly.`;
//pages
export const BASENAME = import.meta.env.MODE === 'production' ? '' : '/site';
export const LANDING_PAGE = `/site`;
export const DASHBOARD = `/dashboard`;

//footer
export const FOOTER_P1 = `All Rights Reserved`;
export const FOOTER_P2 = `@Scott Hebert 2025`;

//endpoints
export const LOGIN = `/login`;
export const SIGNOUT = `/signout`;
export const REGISTER = `/register`;
export const CHANGEPASS = `/changepass`;
export const RECOVERY = `/recovery`;
export const GET_USER_DETAILS = `/getuserdetails`;
export const GET_LOGIN_STATUS = `/getloginstatus`;
export const GET_LOCATION_DETAILS = `/locationdetails`;
export const WORDLE_ATTEMPT = `/wordleattempt`;
export const GET_DAILY_WORD = `/getdailyword`;

//external apis
export const COORDINATES_URL = `https://api.zippopotam.us/US/`;
export const WEATHER_URL = `https://api.weather.gov/points/`;
export const TIMEZONE_URL = `https://api.geonames.org/timezoneJSON?`;

//params
export const USERNAME_PARAM = `?username=`;
export const EMAIL_PARAM = `?email=`;
export const LONGITUDE_PARAM = `?longitude=`;
export const LATITUDE_PARAM = `&latitude=`;
export const SPACE =  `%20`;
export const WORD_PARAM = `&word=`;
export const ATTEMPT_NUM_PARAM = `&attemptNum=`;

//errors and exceptions
export const UNEXPECTED_ERROR = `Unexpected Error`;
export const UNEXPECTED_ERROR_MSG = `An unexpected error occurred. Please try again later.`;
export const ERROR_TRY_AGAIN_MSG = `An error has occurred, please try again.`;
export const TIMEZONE_ERROR = `Error retrieving timezone`;
export const COORDINATES_ERROR = `Error retrieving coordinates`;
export const INVALID_STATE_ERROR = `Invalid entry. Please provide a valid US state.`;
export const UNABLE_TO_FIND_LOC_INFO = `Unable to find location info for the city you entered.`;
export const WEATHER_DATA_RETRIEVAL_ERROR = `Error retrieving weather data`;
export const WEATHER_ENDPOINT_RETRIEVAL_ERROR = `Error retrieving weather endpoints`;
export const INVALID_WORDLE_LENGTH = "Submission must be of length 5";
export const INVALID_WORD_MSG = "The word you have entered is invalid. Please try again.";
export const ERROR_RETRIEVING_LINKS = "Error retrieving leetcode links";

//user management
export const SIGNOUT_SUCCESSFUL = `You've been signed out successfully.`;
export const REGISTRATION_SUCCESSFUL = `Registration successful`;
export const PASSWORD_UPDATED = `Password has been successfully updated`;
export const INCORRECT_CREDENTIALS = `Incorrect username or password, please try again.`;
export const RECOVERY_EMAIL_SENT = `Recovery email sent.`;
export const LOGIN_CHECK_RESPONSE = `User is logged in.`;

//Weather service
export const STATE_CODES = new Map([["Alabama", "AL"], ["Alaska", "AK"], ["Arizona", "AZ"], ["Arkansas", "AR"], ["California", "CA"], ["Colorado", "CO"], ["Connecticut", "CT"], ["Delaware", "DE"], ["Florida", "FL"], ["Georgia", "GA"], ["Hawaii", "HI"],
    ["Idaho", "ID"], ["Illinois", "IL"], ["Indiana", "IN"], ["Iowa", "IA"], ["Kansas", "KS"], ["Kentucky", "KY"], ["Louisiana", "LA"], ["Maine", "ME"], ["Maryland", "MD"],["Massachusetts", "MA"], ["Michigan", "MI"], ["Minnesota", "MN"],
    ["Mississippi", "MS"], ["Missouri", "MO"], ["Montana", "MT"], ["Nebraska", "NE"], ["Nevada", "NV"], ["New Hampshire", "NH"], ["New Jersey", "NJ"], ["New Mexico", "NM"], ["New York", "NY"], ["North Carolina", "NC"], ["North Dakota", "ND"],
    ["Ohio", "OH"], ["Oklahoma", "OK"], ["Oregon", "OR"], ["Pennsylvania", "PA"], ["Rhode Island", "RI"], ["South Carolina", "SC"], ["South Dakota", "SD"], ["Tennessee", "TN"], ["Texas", "TX"], ["Utah", "UT"], ["Vermont", "VT"], ["Virginia", "VA"],
    ["Washington", "WA"], ["Washington D.C.", "DC"], ["West Virginia", "WV"], ["Wisconsin", "WI"], ["Wyoming", "WY"]]);
    
//session storage
export const SESSION_USERNAME = "username;"
export const SESSION_LOGIN_STATUS = `loggedIn`;
export const SESSION_STATE_LOCATION = "state";
export const SESSION_CITY_LOCATION = "city";
export const SESSION_LONGITUDE = "longitude";
export const SESSION_LATITUDE = "latitude";
export const SESSION_WEATHER_DATA = "weatherData";
export const SESSION_STREAK = "streak";
export const SESSION_MAX_STREAK = "maxStreak";
export const SESSION_ATTEMPT_LIMIT_REACHED = "attemptLimitReached";

//display windows
export const CURRENT_LOC_WINDOW = "getCurrentLocation";
export const LOGIN_WINDOW = "login";
export const REGISTRATION_WINDOW = "registration";
export const RECOVERY_WINDOW = "recovery";
export const NO_WINDOW = "";
export const WEEKLY_FORECAST_WINDOW = "displayWeeklyForcast";
export const WORDLE_WINDOW = "wordle";

//leetcode
export const LEETCODE_PREFIX = "https://leetcode.com/problems/";