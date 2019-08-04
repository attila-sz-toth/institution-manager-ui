import axios from "axios/index";
import AuthenticationService, {REST_SERVICE_URL} from "./AuthenticationService";

class UserAdminService {
    PATH_ADD_USER = `add-user`;
    PATH_DELETE_USER = `delete-user`;
    PATH_GET_USERS = `get-users`;

    addUser(username, role) {
        console.log('Creating new user ' + username + ' with role: ' + role);
        return axios.post(`${REST_SERVICE_URL}/${this.PATH_ADD_USER}`, {
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
        return axios.post(`${REST_SERVICE_URL}/${this.PATH_DELETE_USER}`, username, {
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'text/plain'
                }
            }
        )
    }

    getUsers() {
        return axios.get(`${REST_SERVICE_URL}/${this.PATH_GET_USERS}`, {
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