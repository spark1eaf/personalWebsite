import axios from "axios";

const login = (loginObj:LoginData) =>{
    const url = 'http://localhost:8080/login';
    return axios.post(url, loginObj)
        .then(response=>response.data)
        .catch(error => console.log(`Error logging in: ${error.message}`));
};

const register = (newUser:UserObj) =>{
    const url = 'http://localhost:8080/register';
    return axios.post(url, newUser)
        .then(response=>{
            if(response.status === 200){
                console.log(response.data)
                alert("Registration Successful!");
                window.location.reload();
            }
        })
        .catch(error =>{
            alert(`${error.response.data} Please try again.`);
        });
};


const changePassowrd = () =>{
    const url = `http://localhost:8080/changepass`;
    return axios.put(url)
        .then(response=>response.data);
};

const requestRecoveryEmail = (email:string) =>{
    const url = "http://localhost:8080/recovery"
    //not sure type of request needed atm.
};



export default {login, register, changePassowrd, requestRecoveryEmail};