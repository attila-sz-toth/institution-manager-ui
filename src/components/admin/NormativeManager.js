import React, {Component} from "react";
import AuthenticationService from "../../services/AuthenticationService";
import NormativeService from "../../services/NormativeService";

import '../../css/Normative.css';

class NormativeManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: "",
            amount: "",
            normative: [],

            isSubmissionFailed: false,
            isSubmissionSuccessful: false,
            isDeleteFailed: false,
            isDeleteSuccessful: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.loadNormativeGrid();
    }

    loadNormativeGrid() {
        let institutionName = AuthenticationService.getInstitution();
        NormativeService.getNormative(institutionName).then(response => {
            let rows = response.data.map(normative => {
                return (
                    <tr key={normative.id}>
                        <td className="institution-details-content normative-grid-content">{normative.year}</td>
                        <td className="institution-details-content normative-grid-content">{normative.amount} Ft</td>
                        <td className="institution-details-content"><input type="button" value="Törlés"
                                                                           onClick={() => this.handleDelete(institutionName, normative.year)}
                                                                           className="delete-button"/>
                        </td>
                    </tr>
                );
            });
            this.setState({
                normative: rows
            });
        });
    }

    handleSubmit() {
        NormativeService.add(AuthenticationService.getInstitution(), this.state.year, this.state.amount).then(response => {
                this.loadNormativeGrid();
                this.setState({
                    year: "",
                    amount: "",
                    isSubmissionFailed: false,
                    isSubmissionSuccessful: true
                });
                document.getElementById("normative-form").reset();
            }
        ).catch(() => {
            this.setState({
                isSubmissionFailed: true,
                isSubmissionSuccessful: false
            })
        });
    }

    handleDelete(institutionName, year) {
        NormativeService.delete(institutionName, year)
            .then(response => {
                console.log("Institution is deleted successfully!");
                this.setState({
                    isDeleteFailed: false,
                    isDeleteSuccessful: true
                });
                this.loadNormativeGrid();
            }).catch(() => {
            console.log("Institution deletion failed!");
            this.setState({
                isDeleteFailed: true,
                isDeleteSuccessful: false
            });
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }

    formValid() {
        let yearValid = this.state.year.length > 3 && !isNaN(this.state.year) && this.state.year >= 2000;
        let amountValid = this.state.amount.length > 0 && !isNaN(this.state.amount);

        return yearValid && amountValid;
    }

    render() {
        let isSubmitEnabled = this.formValid();
        return (
            <div className="normative-container">

                <div className="add-normative-container">
                    <h4 className="normative-tittle">Normatíva hozzáadása</h4>
                    <form id="normative-form" className="normative-form" onSubmit={this.handleSubmit}>
                        <table className="table-main normative">
                            <tbody>
                            <tr>
                                <th className="table-main-header institution-details-header">Év</th>
                                <td className="institution-details-content">
                                    <input id="year"
                                           type="text"
                                           onChange={this.handleChange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <th className="table-main-header institution-details-header">Normatíva</th>
                                <td className="institution-details-content">

                                    <input id="amount"
                                           type="text"
                                           onChange={this.handleChange}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="button-panel">
                            <button className="button-save" type="button" onClick={this.handleSubmit}
                                    disabled={!isSubmitEnabled}>Normatíva Hozzáadása
                            </button>
                        </div>
                        {this.state.isSubmissionFailed &&
                        <label className="error-message">Normatíva hozzáadása sikertelen!</label>}
                        {this.state.isSubmissionSuccessful &&
                        <label className="success-message">Normatíva sikeresen hozzáadva!</label>}
                    </form>
                </div>

                <div className="normative-grid-container">
                    <h4 className="normative-tittle">Normatívák</h4>
                    <table className="table-main normative">
                        <tbody>
                        <tr>
                            <th className="table-main-header institution-details-header">
                                Év
                            </th>
                            <th className="table-main-header institution-details-header">
                                Normatíva
                            </th>
                            <th className="table-main-header institution-details-header">
                                Művelet
                            </th>
                        </tr>

                        {this.state.normative}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
}

export default NormativeManager;