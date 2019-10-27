import React, {Component} from 'react';

import '../../css/Main.css';
import '../../css/Tables.css';
import CareReceiverService from "../../services/CareReceiverService";
import * as Datetime from "react-datetime";

class AddCareReceiver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            mothersName: "",
            birthDate: "",
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

            sexOptions: [],

            isSubmissionFailed: false,
            isSubmissionSuccessful: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.loadSexes();
    }

    loadSexes() {
        CareReceiverService.getSexes().then(response => {
            let rows = response.data;
            this.setState({sexOptions: rows});
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    isSubmitEnabled() {
        let firstNameValid = this.state.firstName.length > 0;
        let lastNameValid = this.state.lastName.length > 0;
        let mothersNameValid = this.state.mothersName.length > 0;
        let birthDateValid = this.state.birthDate.length > 0;
        let birthNameValid = this.state.birthName.length > 0;
        let birthPlaceValid = this.state.birthPlace.length > 0;
        let sexValid = this.state.sex.length > 0;
        let addressValid = this.state.address.length > 0;
        let tajValid = this.state.taj.length > 0;

        return (
            firstNameValid
            && lastNameValid
            && mothersNameValid
            && birthDateValid
            && birthNameValid
            && birthPlaceValid
            && sexValid
            && addressValid
            && tajValid
        );
    };

    handleSubmit(event, careStatus, startOfCare) {
        CareReceiverService.addCareReceiver(this.state, careStatus, startOfCare)
            .then(response => {
                console.log("Care receiver registered successfully!");
                this.setState({
                    isSubmissionFailed: false,
                    isSubmissionSuccessful: true
                });

                this.resetForm()
            }).catch(() => {
            console.log("Care receiver registration failed!");
            this.setState({
                isSubmissionFailed: true,
                isSubmissionSuccessful: false
            });
        });
    };

    resetForm() {
        this.setState({
            firstName: "",
            lastName: "",
            mothersName: "",
            birthDate: "",
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


        });
        document.getElementById("add-care-receiver-form").reset();
    }

    render() {
        let sexes = this.state.sexOptions;
        let sexSearchItems = sexes.map((sex) =>
            <option key={sex.value} value={sex.value}>{sex.description}</option>
        );

        let isSubmitEnabled = this.isSubmitEnabled();

        return (
            <div className="main-component">
                <div className="add-care-receiver-header">
                    <h3 className="add-care-receiver-title">Új ellátot felvétele</h3>
                    <h6 className="add-care-receiver-warning">A * -gal jelölt mezők kitöltése kötelező</h6>
                </div>

                <form id="add-care-receiver-form" className="care-receiver-details">
                    <table className="table-main institution-details">

                        <tr>
                            <th className="table-main-header institution-details-header">
                                Vezetéknév
                                <label className="mandatory"> *</label>
                            </th>
                            <td className="institution-details-content">
                                <input id="lastName"
                                       type="text"
                                       onChange={this.handleChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">
                                Utónév
                                <label className="mandatory"> *</label>
                            </th>
                            <td className="institution-details-content">
                                <input id="firstName"
                                       type="text"
                                       onChange={this.handleChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">
                                Anyja neve
                                <label className="mandatory"> *</label>
                            </th>
                            <td className="institution-details-content">
                                <input id="mothersName"
                                       type="text"
                                       onChange={this.handleChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">
                                Születési dátum
                                <label className="mandatory"> *</label>
                            </th>
                            <td className="institution-details-content">
                                <Datetime
                                    value={this.state.birthDate}
                                    dateFormat="YYYY. MM. DD."
                                    timeFormat=""
                                    onChange={(date) => this.setState({
                                        birthDate: date._d.toLocaleDateString('hu-HU', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric'
                                        })
                                    })}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">
                                Születési név
                                <label className="mandatory"> *</label>
                            </th>
                            <td className="institution-details-content">
                                <input id="birthName"
                                       type="text"
                                       onChange={this.handleChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">
                                Születési hely
                                <label className="mandatory"> *</label>
                            </th>
                            <td className="institution-details-content">
                                <input id="birthPlace"
                                       type="text"
                                       onChange={this.handleChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">
                                Nem
                                <label className="mandatory"> *</label>
                            </th>
                            <td className="institution-details-content">
                                <select id="sex"
                                        onChange={this.handleChange}>
                                    <option/>
                                    {sexSearchItems}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">
                                Cím
                                <label className="mandatory"> *</label>
                            </th>
                            <td className="institution-details-content">
                                <input id="address"
                                       type="text"
                                       onChange={this.handleChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">Telefonszám</th>
                            <td className="institution-details-content">
                                <input id="phoneNumber"
                                       type="text"
                                       onChange={this.handleChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">E-mail</th>
                            <td className="institution-details-content">
                                <input id="email"
                                       type="text"
                                       onChange={this.handleChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th className="table-main-header institution-details-header">
                                TAJ
                                <label className="mandatory"> *</label>
                            </th>
                            <td className="institution-details-content">
                                <input id="taj"
                                       type="text"
                                       onChange={this.handleChange}
                                />
                            </td>
                        </tr>
                    </table>

                    <div className="button-panel">
                        <button type="button" disabled={!isSubmitEnabled} className="button-save"
                                onClick={(event) => this.handleSubmit(event, "ACTIVE", new Date().toLocaleDateString('hu-HU'))}>
                            Ellátott Felvétele
                        </button>
                        <button type="button" disabled={!isSubmitEnabled} className="button-save"
                                onClick={(event) => this.handleSubmit(event, "WAITING", null)}>
                            Felvétel Várólistára
                        </button>
                    </div>
                    {this.state.isSubmissionFailed &&
                    <label className="error-message">Új ellátott hozzáadása sikertelen!</label>}
                    {this.state.isSubmissionSuccessful &&
                    <label className="success-message">Új ellátott sikeresen hozzáadva!</label>}
                </form>
            </div>
        );
    }
}

export default AddCareReceiver;