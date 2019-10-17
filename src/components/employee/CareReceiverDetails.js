import React, {Component} from "react";

class CareReceiverDetails extends Component {
    constructor({props, firstName, lastName, mothersName, birthDate}) {
        super(props);
        this.state = {
            editButtonLabel: "",

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
            closeRelatives: "",

            isDisabled: true
        };

        this.handleChange = this.handleChange.bind(this);
    }

    refreshComponent(firstName, lastName, mothersName, birthDate) {
        this.setState({
            firstName: firstName,
            lastName: lastName,
            mothersName: mothersName,
            birthDate: birthDate,
        })
    }

    componentDidMount() {
        this.loadCareReceiverDetails();
    }

    loadCareReceiverDetails() {
        this.setState({
            editButtonLabel: "Módosítás"
        });
        // CareReceiverService.get()().then(response => {
        //     this.setState({
        //
        //         name: response.data.name,
        //         address: response.data.address,
        //         type: response.data.type,
        //         careTypes: response.data.careTypes,
        //     });
        // });
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
                    </table>
                    <div className="button-panel">
                        <button type="button" id="button-modify"
                                onClick={() => this.setState({
                                    isDisabled: false,
                                    editButtonLabel: "Módisítások Elvetése"
                                })}>{this.state.editButtonLabel}
                        </button>
                        {
                            !this.state.isDisabled &&
                            <button type="submit" id="button-save" disabled={!isSubmitAllowed}>Mentés</button>
                        }
                        <button type="button" id="button-delete">Ellátás megszűntetése</button>
                    </div>
                </form>

            </div>
        );
    };
}

export default CareReceiverDetails;