interface LoginData{
    username:string,
    password:string,
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
    error?: string,
};