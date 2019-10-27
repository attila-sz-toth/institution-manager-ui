import axios from "axios/index";
import AuthenticationService, {REST_SERVICE_URL} from "./AuthenticationService";

class NormativeService {
    PATH_BASE = '/normative';
    PATH_GET_NORMATIVES = `${this.PATH_BASE}/get-normative-list`;
    PATH_DELETE_NORMATIVE = `${this.PATH_BASE}/delete-normative`;
    PATH_ADD_NORMATIVE = `${this.PATH_BASE}/add-normative`;

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

    add(institutionName, year, amount) {
        return axios.post(`${REST_SERVICE_URL}${this.PATH_ADD_NORMATIVE}/${institutionName}`, {
            year: year,
            amount: amount
        }, {
            headers: {
                authorization: AuthenticationService.getToken(),
                'Content-Type': 'application/json'
            }
        });
    }

    delete(institutionName, year) {
        return axios.delete(`${REST_SERVICE_URL}${this.PATH_DELETE_NORMATIVE}/${institutionName}/${year}`, {
                responseType: 'json',
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    delete(institutionName, year) {
        return axios.delete(`${REST_SERVICE_URL}${this.PATH_DELETE_NORMATIVE}/${institutionName}/${year}`, {
                responseType: 'json',
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    getNormative(institutionName) {
        return this.simpleGet(`${this.PATH_GET_NORMATIVES}/${institutionName}`)
    }
}

export default new NormativeService()