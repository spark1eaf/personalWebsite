interface LoginData{
    username:string,
    password:string
};

interface UserRegObj{
    firstName: string,
    lastName: string
    username:string,
    password:string,
    confirmPass?:string
    email:string,
    zipcode: string,
};

interface ResponseObj<T> {
    status?: number,
    data?: T,
    error?: string
};

interface WordleResponse{
    response: WordleResponseObj[]
}

interface WordleResponseObj{
    letter:string,
    matchType:string
}