import React, {Component} from "react";
import InstitutionService from "../../services/InstitutionService";
import AuthenticationService from "../../services/AuthenticationService";

class InstitutionDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            type: "",
            careTypes: [],
        };
    }

    componentDidMount() {
        this.loadInstitutionDetails();
    }

    loadInstitutionDetails() {
        InstitutionService.getInstitutionDetails(AuthenticationService.getInstitution()).then(response => {
            this.setState({
                name: response.data.name,
                address: response.data.address,
                type: response.data.type,
                careTypes: response.data.careTypes,
            });
        });
    }

    render() {
        let types = this.state.careTypes;
        let careTypesFormatted = types.map((careType) =>
            <li className="institution-details-care-types">{careType.description}</li>
        );

        return (
            <table className="table-main institution-details">
                <tr>
                    <th className="table-main-header institution-details-header">
                        Intézmény neve
                    </th>
                    <td className="institution-details-content">
                        {this.state.name}
                    </td>
                </tr>

                <tr>
                    <th className="table-main-header institution-details-header">
                        Intézmény címe
                    </th>
                    <td className="institution-details-content">
                        {this.state.address}
                    </td>
                </tr>

                <tr>
                    <th className="table-main-header institution-details-header">
                        Intézmény jellege
                    </th>
                    <td className="institution-details-content">
                        {this.state.type.description}
                    </td>
                </tr>

                <tr>
                    <th className="table-main-header institution-details-header">
                        Intézmény ellátási formái
                    </th>
                    <td className="institution-details-content">
                        {careTypesFormatted}
                    </td>
                </tr>
            </table>
        );
    };

}

export default InstitutionDetails;