import React, {Component} from "react";
import AuthenticationService from "../../services/AuthenticationService";
import NormativeService from "../../services/NormativeService";

class NormativeManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: "",
            amount: "",
            normative: [],

            isSubmissionFailed: false,
            isSubmissionSuccessful: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.loadNormativeManager();
    }

    loadNormativeManager() {
        let institutionName = AuthenticationService.getInstitution();
        NormativeService.getNormative(institutionName).then(response => {
            let rows = response.data.map(normative => {
                return (
                    <tr key={normative.id}>
                        <td className="institution-details-content">{normative.year}</td>
                        <td className="institution-details-content">{normative.amount}</td>
                        <td className="institution-details-content"><input type="button" value="Törlés" onClick={() => {
                            NormativeService.delete(institutionName, normative.year)
                        }} className="delete-button"/>
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
                this.loadNormativeManager();
                this.setState({
                    isSubmissionFailed: false,
                    isSubmissionSuccessful: true
                });
            }
        ).catch(() => {
            this.setState({
                isSubmissionFailed: true,
                isSubmissionSuccessful: false
            })
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }

    formValid() {
        let yearValid = this.state.year.length > 0 && !isNaN(this.state.year);
        let amountValid = this.state.amount.length > 0 && !isNaN(this.state.amount);

        return yearValid && amountValid;
    }

    render() {
        let isSubmitEnabled = this.formValid();
        return (
            <div>
                <table className="table-main normative">
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
                </table>
                <h4>Normatíva hozzáadása</h4>
                <form className="normative-form" onSubmit={this.handleSubmit}>
                    <table className="table-main normative">
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
        );
    }
    ;

}

export default NormativeManager;