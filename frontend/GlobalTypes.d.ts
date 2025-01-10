interface LoginData{
    username:string,
    password:string
};

interface UserRegObj{
    username:string,
    password:string,
    email:string,
    zipcode: string,
    firstName: string,
    lastName: string
};

interface ResponseObj<T> {
    status?: number,
    data?: T,
    error?: string
};

interface RegFormErrors{
    emailErr?: string|null,
    firstNameErr?: string|null,
    lastNameErr?: string|null,
    usernameErr?: string|null,
    zipcodeErr?: string|null,
    passwordErr?: string|null,
    confirmPassErr?: string|null
};

interface WordleAttemptData{
    username:string,
    word:string
    attemptNum:number
};

interface WordleResponse{
    response: WordleResponseObj[]
}

interface WordleResponseObj{
    letter:string,
    matchType:string
}