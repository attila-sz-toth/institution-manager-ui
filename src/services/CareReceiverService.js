import axios from "axios/index";
import AuthenticationService, {REST_SERVICE_URL} from "./AuthenticationService";

class CareReceiverService {
    PATH_BASE = '/care-receiver';
    PATH_GET_BY_INSTITUTION = `${this.PATH_BASE}/get-by-institution`;
    PATH_GET_WAITING_LIST_BY_INSTITUTION = `${this.PATH_BASE}/get-waiting`;
    PATH_GET_ARCHIVE_BY_INSTITUTION = `${this.PATH_BASE}/get-terminated`;
    PATH_GET = `${this.PATH_BASE}/get`;
    PATH_SAVE = `${this.PATH_BASE}/update`;
    PATH_GET_SEXES = `${this.PATH_BASE}/get-sexes`;
    PATH_GET_ADD = `${this.PATH_BASE}/add-care-receiver`;
    PATH_DELETE = `${this.PATH_BASE}/delete`;
    PATH_COUNT_CARE_RECEIVERS = `${this.PATH_BASE}/count-care-receivers`;
    PATH_COUNT_WAITING_LIST = `${this.PATH_BASE}/count-waiting-list`;
    PATH_COUNT_ARCHIVE = `${this.PATH_BASE}/count-archive`;
    PATH_COUNT_CARE_RECEIVERS_DATE = `${this.PATH_BASE}/count-care-receivers-date`;
    PATH_NORMATIVE_YEAR = `${this.PATH_BASE}/normative-year`;


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

    getCareReceiversByInstitution(pageNumber, institutionName) {
        return this.simpleGet(`${this.PATH_GET_BY_INSTITUTION}/${pageNumber}/${institutionName}`);
    }

    getWaitingListByInstitution(pageNumber, institutionName) {
        return this.simpleGet(`${this.PATH_GET_WAITING_LIST_BY_INSTITUTION}/${pageNumber}/${institutionName}`);
    }

    getArchiveByInstitution(pageNumber, institutionName) {
        return this.simpleGet(`${this.PATH_GET_ARCHIVE_BY_INSTITUTION}/${pageNumber}/${institutionName}`);
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

    delete(firstName, lastName, mothersName, birthDate) {
        return axios.delete(`${REST_SERVICE_URL}${this.PATH_DELETE}/${firstName}/${lastName}/${mothersName}/${birthDate}`, {
                responseType: 'json',
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    update(state) {
        this.updateBase(state, state.backupFirstName, state.backupLastName, state.backupMothersName, state.backupBirthDate);
    }

    terminate(state) {
        state.careStatus = "TERMINATED";
        state.endOfCare = new Date().toLocaleDateString('hu-HU');
        this.updateBase(state, state.firstName, state.lastName, state.mothersName, state.birthDate);
    }

    startCare(state) {
        state.careStatus = "ACTIVE";
        state.startOfCare = new Date().toLocaleDateString('hu-HU');
        this.updateBase(state, state.firstName, state.lastName, state.mothersName, state.birthDate);
    }

    updateBase(state, firstName, lastName, mothersName, birthDate) {
        console.log('Updating care receiver details ' + state.firstName + " " + state.lastName);
        return axios.put(`${REST_SERVICE_URL}${this.PATH_SAVE}/${firstName}/${lastName}/${mothersName}/${birthDate}`,
            {
                firstName: state.firstName,
                lastName: state.lastName,
                mothersName: state.mothersName,
                birthDate: state.birthDate,
                birthName: state.birthName,
                birthPlace: state.birthPlace,
                sex: state.sex.value,
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
                    'Content-Type': 'application/json'
                }
            })
    }

    addCareReceiver(state, careStatus, startOfCare) {
        console.log('Add care receiver ' + state.firstName + " " + state.lastName);
        return axios.post(`${REST_SERVICE_URL}${this.PATH_GET_ADD}`,
            {
                firstName: state.firstName,
                lastName: state.lastName,
                mothersName: state.mothersName,
                birthDate: state.birthDate,
                birthName: state.birthName,
                birthPlace: state.birthPlace,
                sex: state.sex,
                address: state.address,
                phoneNumber: state.phoneNumber,
                email: state.email,
                careStatus: careStatus,
                institutionName: AuthenticationService.getInstitution(),
                taj: state.taj,
                startOfCare: startOfCare,
                endOfCare: null
            },
            {
                headers: {
                    authorization: AuthenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            })
    }

    countCareReceivers() {
        let institution = AuthenticationService.getInstitution();
        console.log("Count care receivers of institution " + institution);
        return this.simpleGet(this.PATH_COUNT_CARE_RECEIVERS + '/' + institution)
    }

    countWaitingList() {
        let institution = AuthenticationService.getInstitution();
        console.log("Get waiting list size of institute " + institution);
        return this.simpleGet(this.PATH_COUNT_WAITING_LIST + '/' + institution)
    }

    countArchive() {
        let institution = AuthenticationService.getInstitution();
        console.log("Get archive size of institute " + institution);
        return this.simpleGet(this.PATH_COUNT_ARCHIVE + '/' + institution)
    }

    normativeByYear(date) {
        let institution = AuthenticationService.getInstitution();
        return this.simpleGet(this.PATH_NORMATIVE_YEAR + '/' + institution + '/'
            + date.getFullYear());
    }

    countCareReceiversByDate(careReceiverFromDate, careReceiverToDate) {
        let institution = AuthenticationService.getInstitution();
        return this.simpleGet(this.PATH_COUNT_CARE_RECEIVERS_DATE + '/' + institution
            + '/' + careReceiverFromDate.toLocaleDateString('hu-HU', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            })
            + '/' + careReceiverToDate.toLocaleDateString('hu-HU', {year: 'numeric', month: 'numeric', day: 'numeric'})
        );
    }
}

export default new CareReceiverService()