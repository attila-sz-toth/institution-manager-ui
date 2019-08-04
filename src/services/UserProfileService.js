import axios from 'axios';
import AuthenticationService, {REST_SERVICE_URL} from "./AuthenticationService";

class UserProfileService {

    PATH_SET_PASSWORD = `set-password`;

    updatePassword(username, password, newPassword) {
        console.log('Updating password for user ' + username);
        return axios.post(`${REST_SERVICE_URL}/${this.PATH_SET_PASSWORD}`,
            newPassword,
            {
                headers: {
                    authorization: AuthenticationService.createBasicAuthToken(username, password),
                    'Content-Type': 'text/plain'
                }
            })
    }
}

export default new UserProfileService()