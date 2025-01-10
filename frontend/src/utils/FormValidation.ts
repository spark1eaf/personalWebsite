
const checkEmail = (email:string|undefined) =>{
    if(!email)
        return"";
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(email && !regex.test(email)){
           return "Invalid email address.";
    }
    regex = /.com|.org|.net|.edu|.gov/;
    if(email && !regex.test(email)){
        return "Invalid email address";
    }
};

const checkName = (name:string|undefined) =>{
    if(!name)
        return "";
    else if(name.trim().includes(" "))
        return "Field cannot include spaces.";
    else if(name.length < 3)
        return "Field must be atleast length 3."
    return "";
};

const checkZip = (zipcode:string|undefined) =>{
    if(!zipcode)
        return "";
    let regex = /\d/;
    if(zipcode && zipcode.length != 5)
        return "Zipcode must be 5 digits.";
    regex = /^\d+$/
    if(!regex.test(zipcode))
        return "Zipcode must only contain numbers"
    return "";
};

const checkUsername = (username:string|undefined) =>{
    if(!username)
        return "";
    let regex = /[^a-zA-Z0-9]/;
    if(username.length < 5)
        return "Username must be atleast 5 characters.";
    else if(username.length > 15)
        return "Exceeds max length. Max length is 15."
    else if(regex.test(username))
        return "Username cannot contain special characters.";
    return "";
};

const checkPass = (password:string|undefined) =>{
    if(!password)
        return "";
    if(password.length <6)
        return "Password must be atleast 6 characters.";
    let regex = /\d/;
     if(!regex.test(password))
        return "Password must containt atleast one number.";
    regex = /[^a-zA-Z0-9]/;
    if(!regex.test(password))
        return "password must containt atleast one special character. e.g. @ or #";
    regex = /[a-z]/;
    if(!regex.test(password))
        return "Password must contain atleast one lowecase letter.";
    regex = /[A-Z]/;
    if(!regex.test(password))
        return "Password must contain atleast one uppercase letter.";
    return "";
};

const checkPassMatch = (password:string|undefined, confirmPassword:string|undefined) =>{
    if(confirmPassword && password !== confirmPassword)
        return "Passwords do not match.";
    return "";
}

//checks if word entered is valid
const isWord = (word:string) =>{
    const regex = /[^a-zA-Z]/;
    return regex.test(word.trim());
}

export default {checkEmail, checkUsername, checkPass, checkZip, checkName, checkPassMatch, isWord}