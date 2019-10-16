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
            closeRelatives: ""
        };
    }

    refreshComponent(firstName, lastName, mothersName, birthDate) {
        this.setState({
            firstName: firstName,
            lastName: lastName,
            mothersName: mothersName,
            birthDate: birthDate,
        })
    }

    loadCareReceiverDetails() {
        CareReceiverService.get()().then(response => {
            this.setState({
                name: response.data.name,
                address: response.data.address,
                type: response.data.type,
                careTypes: response.data.careTypes,
            });
        });
    }

    render() {
        return (
            <div>
                <form>
                    <table className="table-main institution-details">
                        <tr>
                            <th className="table-main-header institution-details-header">Titulus</th>
                            <td className="institution-details-content">
                                <input id="username"
                                       className="details-input"
                                       type="text"
                                       onChange={this.handleUsernameChange}
                                       value={this.state.title}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">Vezetéknév</th>
                            <td className="institution-details-content">
                                <input id="care"
                                       className="details-input"
                                       type="text"
                                       onChange={this.handleUsernameChange}
                                       value={this.state.lastName}
                                       disabled={true}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">Utónév</th>
                            <td className="institution-details-content">
                                {this.state.firstName}
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">2. Utónév</th>
                            <td className="institution-details-content">
                                {this.state.middleName}
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        );
    };
}

export default CareReceiverDetails;