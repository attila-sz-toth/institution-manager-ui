import React, {Component} from 'react';

import '../../css/Main.css';
import '../../css/Tables.css'
import InstitutionService from "../../services/InstitutionService";

class AddInstitution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            institutionName: "",
            address: "",
            institutionType: "",
            careTypes: [],

            institutionTypeOptions: [],
            careTypeOptions: [],

            isSubmitEnabled: false,
            isSubmissionFailed: false,
            isSubmissionSuccessful: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    componentDidMount() {
        this.loadInstitutionTypes();
        this.loadCareTypes();
    }

    loadInstitutionTypes() {
        InstitutionService.getInstitutionTypes().then(response => {
            this.setState({institutionTypeOptions: response.data});
        });
    }

    loadCareTypes() {
        InstitutionService.getCareTypes().then(response => {
            this.setState({careTypeOptions: response.data});
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value,
        });
        let submitEnabledUpdate = this.isSubmitEnabledUpdate();
        this.setState({
            isSubmitEnabled: submitEnabledUpdate,
        });

        console.log(this.state);
    };

    handleCheckboxChange(event) {
        this.setState({
            // [event.target.id]: event.target.isChecked;
        });
        let submitEnabledUpdate = this.isSubmitEnabledUpdate();
        this.setState({
            isSubmitEnabled: submitEnabledUpdate,
        });

        console.log(this.state);
    };

    isSubmitEnabledUpdate() {
        let institutionNameValid = this.state.institutionName.length > 0;
        let addressValid = this.state.address.length > 0;
        let institutionTypeValid = this.state.institutionType.length > 0;
        let careTypesValid = this.state.careTypes.size > 0;
        return (institutionNameValid && addressValid && institutionTypeValid && careTypesValid);
    };

    handleSubmit(event) {
        event.preventDefault();

        InstitutionService.addInstitution(this.state.institutionName, this.state.address, this.state.institutionType, this.state.careTypes)
            .then(response => {
                console.log("Institution is added successfully!");
                this.setState({
                    isSubmissionFailed: false,
                    isSubmissionSuccessful: true
                });
            }).catch(() => {
            console.log("Institution addition failed!");
            this.setState({
                isSubmissionFailed: true,
                isSubmissionSuccessful: false
            });
        });
    };

    render() {
        let institutionTypes = this.state.institutionTypeOptions;
        let institutionTypeSearchItems = institutionTypes.map((institutionType) =>
            <option key={institutionType.value}>{institutionType.description}</option>
        );

        let careTypes = this.state.careTypeOptions;
        let careTypeItems = careTypes.map((careType) =>
            <tr>
                <td className="checkbox-cell">
                    <input type="checkbox" name={careType.description} value={careType.value} onChange={this.handleCheckboxChange}/>
                </td>
                <td>
                    {careType.description}
                </td>
            </tr>
        );


        return (
            <div>
                <form className="main-form" onSubmit={this.handleSubmit}>
                    <label>
                        Intézmény neve:
                    </label>
                    <input id="institutionName"
                           type="text"
                           onChange={this.handleChange}
                    />
                    <label>
                        Intézmény címe:
                    </label>
                    <input id="address"
                           type="text"
                           onChange={this.handleChange}
                    />
                    <label>
                        Intézmény jellege:
                    </label>
                    <select id="institutionType" onChange={this.handleChange}>
        nChang          <option hidden disabled selected value> -- Válassza ki az intézmény jellegét --</option>
                        {institutionTypeSearchItems}
                    </select>
                    <label>
                        Intézmény ellátási formái:
                    </label>
                    <table className="care-types">
                        {careTypeItems}
                    </table>

                    <button type="submit" disabled={!this.state.isSubmitEnabled}>Új Intézmény Hozzáadása</button>
                    {this.state.isSubmissionFailed &&
                    <label className="error-message">Új intézmény hozzáadása sikertelen!</label>}
                    {this.state.isSubmissionSuccessful &&
                    <label className="success-message">Új intézmény sikeresen hozzáadva!</label>}
                </form>
            </div>
        );
    }
}

export default AddInstitution;