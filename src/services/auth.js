import axios from 'axios';

export const signUpUser = (userType,details) => {
    return axios.post("http://wren.in:3200/api/sign-up/"+userType, details).then(response => ({ response }), error => ({ error }));
}
