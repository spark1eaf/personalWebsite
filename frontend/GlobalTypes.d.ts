interface LoginData{
    username:string,
    password:string,
}

interface UserObj{
    username:string,
    password:string,
    email:string
}

interface ResponseObj<T> {
    status?: number,
    data?: T,
    error?: string,
}