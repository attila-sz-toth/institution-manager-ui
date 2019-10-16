import axios from "axios/index";
import AuthenticationService, {REST_SERVICE_URL} from "./AuthenticationService";

class InstitutionService {
    PATH_BASE = '/institutions';
    PATH_GET_INSTITUTIONS = `${this.PATH_BASE}/get-institutions`;
    PATH_GET_INSTITUTION_DETAILS = `${this.PATH_BASE}/get-institution-details`;
    PATH_GET_INSTITUTION_NAMES = `${this.PATH_BASE}/get-institution-names`;
    PATH_GET_INSTITUTION_TYPES = `${this.PATH_BASE}/get-institution-types`;
    PATH_GET_CARE_TYPES = `${this.PATH_BASE}/get-care-types`;
    PATH_POST_ADD_INSTITUTION = `${this.PATH_BASE}/add-institution`;

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

    getInstitutionDetails(institutionName) {
        return this.simpleGet(`${this.PATH_GET_INSTITUTION_DETAILS}/${institutionName}`);
    }

    getInstitutions() {
        return this.simpleGet(this.PATH_GET_INSTITUTIONS);
    }

    getInstitutionNames() {
        return this.simpleGet(this.PATH_GET_INSTITUTION_NAMES);
    }

    getInstitutionTypes() {
        return this.simpleGet(this.PATH_GET_INSTITUTION_TYPES);
    }

    getCareTypes() {
        return this.simpleGet(this.PATH_GET_CARE_TYPES);
    }

    addInstitution(institutionName, address, institutionType, careTypes) {
        console.log('Adding new institution ' + institutionName);
        console.log('Add care types: ' + careTypes);
        return axios.post(`${REST_SERVICE_URL}${this.PATH_POST_ADD_INSTITUTION}`, {
                name: institutionName,
                address: address,
                type: institutionType,
                careTypes: careTypes
            }, {
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            }
        )
    }
}

export default new InstitutionService()