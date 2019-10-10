import axios from "axios/index";
import AuthenticationService, {REST_SERVICE_URL} from "./AuthenticationService";

class UserAdminService {
    PATH_ADD_USER = `/user/add-user`;
    PATH_DELETE_USER = `/user/delete-user`;
    PATH_GET_USERS = `/user/get-users`;
    PATH_GET_ROLES = `/user/get-roles`;

    addUser(username, role) {
        console.log('Creating new user ' + username + ' with role: ' + role);
        return axios.post(`${REST_SERVICE_URL}${this.PATH_ADD_USER}`, {
                username: username,
                role: role
            }, {
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    deleteUser(username) {
        console.log('Deleting user ' + username);
        return axios.post(`${REST_SERVICE_URL}${this.PATH_DELETE_USER}`, username, {
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'text/plain'
                }
            }
        )
    }

    getUsers(pageNumber) {
        return axios.get(`${REST_SERVICE_URL}${this.PATH_GET_USERS}/${pageNumber}`, {
                responseType: 'json',
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    getRoles() {
        return axios.get(`${REST_SERVICE_URL}${this.PATH_GET_ROLES}`, {
                responseType: 'json',
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}

export default new UserAdminService()