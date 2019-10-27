import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import InstitutionService from "../../services/InstitutionService";

import '../../css/Main.css';
import '../../css/Tables.css';
import {INSTITUTION_SESSION_ATTRIBUTE_NAME} from "../../services/AuthenticationService";

class InstitutionsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            institutions: [],
            isDeleteFailed: false,
            isDeleteSuccessful: false
        };
    }

    componentDidMount() {
        this.loadInstitutions(this.state.currentPage);
    }

    loadInstitutions() {
        InstitutionService.getInstitutions().then(response => {
            let rows = response.data.map(institution => {
                return (
                    <tr key={institution.name}>
                        <td className="users-table-cell">{institution.name}</td>
                        <td className="users-table-cell">{institution.type.description}</td>
                        <td><input type="button" value="Adatlap" onClick={() => {
                            sessionStorage.setItem(INSTITUTION_SESSION_ATTRIBUTE_NAME, institution.name);
                            window.location = '/institution-home';
                        }}
                                   className="edit-button"/>
                        </td>
                        <td><input type="button" value="Törlés" onClick={() => this.handleDelete(institution.name)}
                                   className="delete-button"/>
                        </td>
                    </tr>
                );
            });
            this.setState({
                institutions: rows,
            });
        });
    }

    handleDelete(username) {
        InstitutionService.deleteUser(username)
            .then(response => {
                console.log("Institution is deleted successfully!");
                this.setState({
                    isDeleteFailed: false,
                    isDeleteSuccessful: true
                });
                this.loadInstitutions();
            }).catch(() => {
            console.log("Institution deletion failed!");
            this.setState({
                isDeleteFailed: true,
                isDeleteSuccessful: false
            });
        });
    };

    render() {

        return (

            <div className="users-container">
                <table className="table-main">
                    <thead>
                    <tr>
                        <th className="table-main-header" id="name">Intézmény Neve</th>
                        <th className="table-main-header" id="institution-type">Intézmény Jellege</th>
                        <th colspan="2" className="table-main-header" id="action">Műveletek</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.institutions}
                    </tbody>
                </table>

                {this.state.isDeleteFailed &&
                <label className="error-message">Az intézmény törlése sikertelen!</label>}
                {this.state.isDeleteSuccessful &&
                <label className="success-message">Az intézmény sikeresen törölve!</label>}

            </div>
        );
    }
}

export default InstitutionsGrid;