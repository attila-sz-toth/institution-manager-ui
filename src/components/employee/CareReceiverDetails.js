import React, {Component} from "react";
import CareReceiverService from "../../services/CareReceiverService";

class CareReceiverDetails extends Component {
    constructor({props, firstName, lastName, mothersName, birthDate}) {
        super(props);
        this.state = {
            title: "",
            firstName: firstName,
            middleName: "",
            lastName: lastName,
            mothersName: mothersName,
            birthDate: birthDate,
            birthName: "",
            birthPlace: "",
            sex: "",
            address: "",
            phoneNumber: "",
            email: "",
            careStatus: "",
            institutionName: "",
            taj: "",
            startOfCare: "",
            endOfCare: "",

            isDisabled: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.loadCareReceiverDetails = this.loadCareReceiverDetails.bind(this);
    }

    componentWillMount() {
        this.loadCareReceiverDetails(this.state.firstName, this.state.lastName, this.state.mothersName, this.state.birthDate);
    }

    loadCareReceiverDetails(firstName, lastName, mothersName, birthDate) {
        CareReceiverService.get(firstName, lastName, mothersName, birthDate).then(response => {
            this.setState({
                title: response.data.title,
                firstName: response.data.firstName,
                middleName: response.data.middleName,
                lastName: response.data.lastName,
                mothersName: response.data.mothersName,
                birthDate: response.data.birthDate,
                birthName: response.data.birthName,
                birthPlace: response.data.birthPlace,
                sex: response.data.sex,
                address: response.data.address,
                phoneNumber: response.data.phoneNumber,
                email: response.data.email,
                careStatus: response.data.careStatus,
                institutionName: response.data.institutionName,
                taj: response.data.taj,
                startOfCare: response.data.startOfCare,
                endOfCare: response.data.endOfCare,
            });
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    isSubmitAllowed() {
        let isFirstNameValid = this.state.firstName.length > 0;
        let isLastNameValid = this.state.lastName.length > 0;
        let isMothersNameValid = this.state.mothersName.length > 0;
        let isBirthDateValid = this.state.birthDate.length > 0;
        return isFirstNameValid && isLastNameValid && isMothersNameValid && isBirthDateValid;
    }

    render() {
        let isSubmitAllowed = this.isSubmitAllowed();

        return (
            <div>
                <form className="care-receiver-details">
                    <table className="table-main institution-details">
                        <tr>
                            <th className="table-main-header institution-details-header">Titulus</th>
                            <td className="institution-details-content">
                                <input id="title"
                                       className="details-input"
                                       type="text"
                                       onChange={this.handleChange}
                                       value={this.state.title}
                                       disabled={this.state.isDisabled}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">Vezetéknév</th>
                            <td className="institution-details-content">
                                <input id="lastName"
                                       className="details-input"
                                       type="text"
                                       onChange={this.handleUsernameChange}
                                       value={this.state.lastName}
                                       disabled={this.state.isDisabled}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">Utónév</th>
                            <td className="institution-details-content">
                                <input id="firstName"
                                       className="details-input"
                                       type="text"
                                       onChange={this.handleChange}
                                       value={this.state.firstName}
                                       disabled={this.state.isDisabled}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">2. Utónév</th>
                            <td className="institution-details-content">
                                <input id="middleName"
                                       className="details-input"
                                       type="text"
                                       onChange={this.handleChange}
                                       value={this.state.middleName}
                                       disabled={this.state.isDisabled}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">Anyja Neve</th>
                            <td className="institution-details-content">
                                <input id="mothersName"
                                       className="details-input"
                                       type="text"
                                       onChange={this.handleChange}
                                       value={this.state.mothersName}
                                       disabled={this.state.isDisabled}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">Születési dátum</th>
                            <td className="institution-details-content">
                                <input id="birthDate"
                                       className="details-input"
                                       type="text"
                                       onChange={this.handleChange}
                                       value={this.state.birthDate}
                                       disabled={this.state.isDisabled}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">Születési Név</th>
                            <td className="institution-details-content">
                                <input id="birthName"
                                       className="details-input"
                                       type="text"
                                       onChange={this.handleChange}
                                       value={this.state.birthName}
                                       disabled={this.state.isDisabled}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">Születési Hely</th>
                            <td className="institution-details-content">
                                <input id="birthPlace"
                                       className="details-input"
                                       type="text"
                                       onChange={this.handleChange}
                                       value={this.state.birthPlace}
                                       disabled={this.state.isDisabled}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">Nem</th>
                            <td className="institution-details-content">
                                {
                                    <input id="sex"
                                           className="details-input"
                                           type="text"
                                           onChange={this.handleChange}
                                           value={this.state.sex.description}
                                           disabled={true}
                                    />
                                }
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">Cím</th>
                            <td className="institution-details-content">
                                <input id="address"
                                       className="details-input"
                                       type="text"
                                       onChange={this.handleChange}
                                       value={this.state.address}
                                       disabled={this.state.isDisabled}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">Telefonszám</th>
                            <td className="institution-details-content">
                                <input id="phoneNumber"
                                       className="details-input"
                                       type="text"
                                       onChange={this.handleChange}
                                       value={this.state.phoneNumber}
                                       disabled={this.state.isDisabled}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">E-mail</th>
                            <td className="institution-details-content">
                                <input id="email"
                                       className="details-input"
                                       type="text"
                                       onChange={this.handleChange}
                                       value={this.state.email}
                                       disabled={this.state.isDisabled}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">TAJ</th>
                            <td className="institution-details-content">
                                <input id="taj"
                                       className="details-input"
                                       type="text"
                                       onChange={this.handleChange}
                                       value={this.state.taj}
                                       disabled={this.state.isDisabled}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">Ellátás kezdete</th>
                            <td className="institution-details-content">
                                <input id="startOfCare"
                                       className="details-input"
                                       type="text"
                                       onChange={this.handleChange}
                                       value={this.state.startOfCare}
                                       disabled={true}
                                />
                            </td>
                        </tr>

                        {
                            this.state.careStatus === "TERMINATED" &&
                            <tr>
                                <th className="table-main-header institution-details-header">Ellátás vége</th>
                                <td className="institution-details-content">
                                    <input id="endOfCare"
                                           className="details-input"
                                           type="text"
                                           onChange={this.handleChange}
                                           value={this.state.endOfCare}
                                           disabled={true}
                                    />
                                </td>
                            </tr>
                        }
                    </table>
                    <div className="button-panel">
                        {
                            this.state.careStatus !== "TERMINATED" &&
                            this.state.isDisabled &&
                            <button type="button" id="button-modify"
                                    onClick={() => this.setState({
                                        isDisabled: false,
                                        backupFirstName: this.state.firstName,
                                        backupLastName: this.state.lastName,
                                        backupMothersName: this.state.mothersName,
                                        backupBirthDate: this.state.birthDate,
                                    })}>Módosítás
                            </button>
                        }
                        {
                            !this.state.isDisabled &&
                            <button type="button" id="button-modify"
                                    onClick={() => {
                                        this.loadCareReceiverDetails(this.state.backupFirstName, this.state.backupLastName,
                                            this.state.mothersName, this.state.birthDate);
                                        this.setState({
                                            isDisabled: true,
                                            backupFirstName: undefined,
                                            backupLastName: undefined,
                                            backupMothersName: undefined,
                                            backupBirthDate: undefined,
                                        });
                                    }}>Módisítások Elvetése
                            </button>
                        }
                        {
                            !this.state.isDisabled &&
                            <button type="button" id="button-save" disabled={!isSubmitAllowed}
                                    onClick={() => {
                                        CareReceiverService.update(this.state);
                                        this.setState({
                                            isDisabled: true,
                                            backupFirstName: undefined,
                                            backupLastName: undefined,
                                            backupMothersName: undefined,
                                            backupBirthDate: undefined,
                                        });
                                    }}>Mentés</button>
                        }
                        {
                            this.state.careStatus === "ACTIVE" &&
                            <button type="button" id="button-delete" onClick={() => {
                                CareReceiverService.terminate(this.state);
                            }
                            }>Ellátás megszűntetése</button>
                        }
                        {
                            this.state.careStatus === "WAITING" &&
                            <button type="button" id="button-save" onClick={() => {
                                CareReceiverService.startCare(this.state);
                            }
                            }>Ellátás megkezdése</button>
                        }
                        {
                            this.state.careStatus === "WAITING" &&
                            <button type="button" id="button-delete" onClick={() => {
                                CareReceiverService.delete(this.state.firstName, this.state.lastName,
                                    this.state.mothersName, this.state.birthDate);
                            }
                            }>Törlés várólistáról</button>
                        }
                    </div>
                </form>
            </div>
        );
    };
}

export default CareReceiverDetails;