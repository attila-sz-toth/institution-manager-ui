import axios from "axios/index";
import AuthenticationService, {REST_SERVICE_URL} from "./AuthenticationService";

class InstitutionService {
    PATH_GET_INSTITUTIONS = `/institutions/get-institutions`;
    PATH_GET_INSTITUTION_TYPES = `/institutions/get-institution-types`;
    PATH_GET_CARE_TYPES = `/institutions/get-care-types`;

    getInstitutions() {
        return axios.get(`${REST_SERVICE_URL}${this.PATH_GET_INSTITUTIONS}`, {
                responseType: 'json',
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    getInstitutionTypes() {
        return axios.get(`${REST_SERVICE_URL}${this.PATH_GET_INSTITUTION_TYPES}`, {
                responseType: 'json',
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    getCareTypes() {
        return axios.get(`${REST_SERVICE_URL}${this.PATH_GET_CARE_TYPES}`, {
                responseType: 'json',
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    addInstitution(institutionName, address, institutionType, careTypes) {
        return axios.post(`${REST_SERVICE_URL}${this.PATH_GET_CARE_TYPES}`, {
                responseType: 'json',
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}

export default new InstitutionService()