import axios from 'axios';
import base64 from "react-native-base64";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'username';
export const ROLE_SESSION_ATTRIBUTE_NAME = 'role';
export const INSTITUTION_SESSION_ATTRIBUTE_NAME = 'institution';
export const TOKEN = 'TOKEN';
export const ADMIN_ROLE = 'ADMIN';
export const EMPLOYEE_ROLE = 'EMPLOYEE';
export const REST_SERVICE_URL = 'http://institutionm-env.tqfqwctx4s.us-east-2.elasticbeanstalk.com';

class AuthenticationService {

    login(username, password) {
        console.log('Logging in user ' + username);
        return axios.get(`${REST_SERVICE_URL}/login`,
            {
                headers: {
                    authorization: this.createBasicAuthToken(username, password),
                    'Access-Control-Allow-Origin': '*'
                }
            })
    }

    registerSuccessfulLogin(username, password, role, institution) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        sessionStorage.setItem(ROLE_SESSION_ATTRIBUTE_NAME, role);
        sessionStorage.setItem(INSTITUTION_SESSION_ATTRIBUTE_NAME, institution);
        sessionStorage.setItem(TOKEN, this.createBasicAuthToken(username, password));

        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + base64.encode(username + ":" + password)
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(ROLE_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(TOKEN);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user !== null;
    }

    getUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user === null ? '' : user;
    }

    getRole() {
        let role = sessionStorage.getItem(ROLE_SESSION_ATTRIBUTE_NAME);
        return role === null ? '' : role;
    }

    getToken() {
        let token = sessionStorage.getItem(TOKEN);
        return token === null ? '' : token;
    }

    getInstitution() {
        let institution = sessionStorage.getItem(INSTITUTION_SESSION_ATTRIBUTE_NAME);
        return institution === null ? '' : institution;
    }
}

export default new AuthenticationService()