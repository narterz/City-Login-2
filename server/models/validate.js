const specialCharsTest = (value) => {
    const chars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
    const ints = /[0-9]/;
    return chars.test(value) && chars.test(ints);
};

const capitalCharTest = (value) => {
    return /[A-Z]/.test(value)
}

const passwordValidate = (value) => {
    if(value.length >= 8){
        return specialCharsTest && capitalCharTest 
    } else {
        return false
    }
}

const usernameValidate = (value) => {
    return value.length >= 8 && /[a-zA-Z]/.test(value);
}

const nameValidate = (value) => {
    return !/[0-9]/.test(value) && value;
}

module.exports = {
    passwordValidate,
    usernameValidate,
    nameValidate
}