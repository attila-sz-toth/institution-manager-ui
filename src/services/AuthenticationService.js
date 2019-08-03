import axios from 'axios';
import base64 from 'react-native-base64';

// const REST_SERVICE_URL = 'https://localhost:8443';
const REST_SERVICE_URL = 'http://localhost:8080';
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'username';
export const ROLE_SESSION_ATTRIBUTE_NAME = 'role';
export const ADMIN_ROLE = '[ADMIN]';
export const EMPLOYEE_ROLE = '[EMPLOYEE]';

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

    createBasicAuthToken(username, password) {
        return 'Basic ' + base64.encode(username + ":" + password)
        // OR return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password, role) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        sessionStorage.setItem(ROLE_SESSION_ATTRIBUTE_NAME, role);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
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

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(ROLE_SESSION_ATTRIBUTE_NAME);
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

    addUser(username, role) {
        console.log('Creating new user ' + username + ' with role: ' + role);
        return axios.post(`${REST_SERVICE_URL}/add-user`, {
                username: username,
                role: role
            }, {
                headers: {
                    authorization: this.createBasicAuthToken(username, 'admin'),
                    'Content-Type': 'application/json'
                }
            }
        )
    }
}

export default new AuthenticationService()