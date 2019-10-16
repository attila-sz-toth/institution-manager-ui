import axios from "axios/index";
import AuthenticationService, {REST_SERVICE_URL} from "./AuthenticationService";

class CareReceiverService {
    PATH_BASE = '/care-receiver';
    PATH_GET_BY_INSTITUTION = `${this.PATH_BASE}/get-by-institution`;
    PATH_GET = `${this.PATH_BASE}/get`;


    simpleGet(path) {
        return axios.get(`${REST_SERVICE_URL}${path}`, {
                responseType: 'json',
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    getByInstitution(pageNumber, institutionName) {
        return this.simpleGet(`${this.PATH_GET_BY_INSTITUTION}/${pageNumber}/${institutionName}`);
    }

    get(firstName, lastName, mothersName, birthDate) {
        return axios.get(`${REST_SERVICE_URL}${this.PATH_GET}`, {
                responseType: 'json',
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            }
        );
    }


}

export default new CareReceiverService()