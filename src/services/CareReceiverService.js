import axios from "axios/index";
import AuthenticationService, {REST_SERVICE_URL} from "./AuthenticationService";

class CareReceiverService {
    PATH_BASE = '/care-receiver';
    PATH_GET_BY_INSTITUTION = `${this.PATH_BASE}/get-by-institution`;
    PATH_GET = `${this.PATH_BASE}/get`;
    PATH_SAVE = `${this.PATH_BASE}/update`;
    PATH_GET_SEXES = `${this.PATH_BASE}/get-sexes`;
    PATH_GET_ADD = `${this.PATH_BASE}/add-care-receiver`;


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
        return axios.get(`${REST_SERVICE_URL}${this.PATH_GET}/${firstName}/${lastName}/${mothersName}/${birthDate}`, {
                responseType: 'json',
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    getSexes() {
        return this.simpleGet(this.PATH_GET_SEXES);
    }

    update(state) {
        console.log('Updating care receiver details ' + state.firstName + " " + state.lastName);
        return axios.put(`${REST_SERVICE_URL}${this.PATH_SAVE}`,
            {
                title: state.title,
                firstName: state.firstName,
                middleName: state.middleName,
                lastName: state.lastName,
                mothersName: state.mothersName,
                birthDate: state.birthDate,
                birthName: state.birthName,
                birthPlace: state.birthPlace,
                sex: state.sex,
                address: state.address,
                phoneNumber: state.phoneNumber,
                email: state.email,
                careStatus: state.careStatus,
                institutionName: state.institutionName,
                taj: state.taj,
                startOfCare: state.startOfCare,
                endOfCare: state.endOfCare
            },
            {
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'text/plain'
                }
            })
    }

    addCareReceiver(state) {
        console.log('Add care receiver ' + state.firstName + " " + state.lastName);
        return axios.put(`${REST_SERVICE_URL}${this.PATH_GET_ADD}`,
            {
                title: state.title,
                firstName: state.firstName,
                middleName: state.middleName,
                lastName: state.lastName,
                mothersName: state.mothersName,
                birthDate: state.birthDate,
                birthName: state.birthName,
                birthPlace: state.birthPlace,
                sex: state.sex,
                address: state.address,
                phoneNumber: state.phoneNumber,
                email: state.email,
                careStatus: state.careStatus,
                institutionName: state.institutionName,
                taj: state.taj,
                startOfCare: state.startOfCare,
                endOfCare: state.endOfCare
            },
            {
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'text/plain'
                }
            })
    }


}

export default new CareReceiverService()