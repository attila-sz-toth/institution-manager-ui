import axios from 'axios';
import base64 from 'react-native-base64';

const REST_SERVICE_URL = 'http://localhost:8080';

class UserService {

    updatePassword(username, password, newPassword) {
        console.log('Updating password for user ' + username);
        return axios.post(`${REST_SERVICE_URL}/set-password`,
            newPassword,
            {
                headers: {
                    authorization: this.createBasicAuthToken(username, password),
                    'Content-Type': 'text/plain'
                }
            })
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + base64.encode(username + ":" + password)
        // OR return 'Basic ' + window.btoa(username + ":" + password)
    }
}

export default new UserService()