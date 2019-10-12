import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import InstitutionService from "../../services/InstitutionService";

import '../../css/Main.css';
import '../../css/Tables.css';

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
                        <td><input type="button" value="Módosítás" onClick={() => this.handleDelete(institution.name)}
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
                console.log("User is deleted successfully!");
                this.setState({
                    isSubmissionFailed: false,
                    isSubmissionSuccessful: true
                });
                this.loadInstitutions();
            }).catch(() => {
            console.log("User deletion failed!");
            this.setState({
                isSubmissionFailed: true,
            });
        });
    };

    render() {

        return (

            <div className="users-container">
                <table className="users-table">
                    <thead>
                    <tr>
                        <th className="users-table-header" id="name">Intézmény Neve</th>
                        <th className="users-table-header" id="institution-type">Intézmény Jellege</th>
                        <th colSpan="2" className="users-table-header" id="action" >Műveletek</th>
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