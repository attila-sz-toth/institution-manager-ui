import React, {Component} from 'react';

import '../../css/Main.css';
import CareReceiverService from "../../services/CareReceiverService";

class AddCareReceiver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            firstName: "",
            middleName: "",
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

        this.handleSubmit = this.handleSubmit.bind(this);
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
        let lastNameValid = this.state.lastName > 0;
        let mothersNameValid = this.state.mothersName.length > 0;
        let birthDateValid = this.state.birthDate.length > 0;
        let birthNameValid = this.state.birthName.length > 0;
        let birthPlaceValid = this.state.birthPlace.length > 0;
        let sexValid = this.state.sex.length > 0;
        let addressValid = this.state.address.length > 0;

        return (
            firstNameValid &&
            lastNameValid &&
            mothersNameValid &&
            birthDateValid &&
            birthNameValid &&
            birthPlaceValid &&
            sexValid &&
            addressValid
        );
    };

    handleSubmit(event) {
        event.preventDefault();

        CareReceiverService.addCareReceiver(this.state)
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
            title: "",
            firstName: "",
            middleName: "",
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
            endOfCare: ""
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

                <form id="add-care-receiver-form" className="main-form" onSubmit={this.handleSubmit}>
                    <label>
                        Titulus:
                    </label>
                    <input id="title"
                           type="text"
                           onChange={this.handleUsernameChange}
                    />
                    <label>
                        Vezetéknév:
                    </label>
                    <label className="mandatory">*</label>
                    <input id="lastName"
                           type="text"
                           onChange={this.handleUsernameChange}
                    />
                    <label>
                        Keresztnév:
                    </label>
                    <input id="firstName"
                           type="text"
                           onChange={this.handleUsernameChange}
                    />
                    <label>
                        2. Keresztnév:
                    </label>
                    <label className="mandatory">*</label>
                    <input id="middleName"
                           type="text"
                           onChange={this.handleUsernameChange}
                    />
                    <label>
                        Anyja neve:
                    </label>
                    <label className="mandatory">*</label>
                    <input id="mothersName"
                           type="text"
                           onChange={this.handleUsernameChange}
                    />
                    <label>
                        Születési dátum:
                    </label>
                    <label className="hint"> (formátum: ÉÉÉÉ. HH. NN.)</label>
                    <label className="mandatory">*</label>
                    <input id="birthDate"
                           type="text"
                           onChange={this.handleUsernameChange}
                    />
                    <label>
                        Születési név:
                    </label>
                    <label className="mandatory">*</label>
                    <input id="birthName"
                           type="text"
                           onChange={this.handleUsernameChange}
                    />
                    <label>
                        Születési hely:
                    </label>
                    <label className="mandatory">*</label>
                    <input id="birthPlace"
                           type="text"
                           onChange={this.handleUsernameChange}
                    />
                    <label>
                        Nem:
                    </label>
                    <label className="mandatory">*</label>
                    <select id="sex"
                            onChange={this.handleChange}>
                        <option hidden disabled selected value> --</option>
                        {sexSearchItems}
                    </select>
                    <label>
                        Cím:
                    </label>
                    <label className="mandatory">*</label>
                    <input id="address"
                           type="text"
                           onChange={this.handleUsernameChange}
                    />
                    <label>
                        Telefonszám:
                    </label>
                    <input id="phoneNumber"
                           type="text"
                           onChange={this.handleUsernameChange}
                    />
                    <label>
                        E-mail:
                    </label>
                    <input id="email"
                           type="text"
                           onChange={this.handleUsernameChange}
                    />
                    <label>
                        TAJ:
                    </label>
                    <label className="mandatory">*</label>
                    <input id="taj"
                           type="text"
                           onChange={this.handleUsernameChange}
                    />


                    <button type="submit" disabled={!isSubmitEnabled}>Új Ellátott Hozzáadása</button>
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