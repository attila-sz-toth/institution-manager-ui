import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";

import '../../css/Main.css';
import '../../css/Tables.css';
import '../../css/CareReceiver.css';
import CareReceiverService from "../../services/CareReceiverService";
import AuthenticationService from "../../services/AuthenticationService";
import CareReceiverDetails from "./CareReceiverDetails";

class CareReceiversGrid extends Component {
    constructor(props) {
        super(props);
        this.careReceiverDetails = React.createRef();
        this.state = {
            careReceivers: [],
            currentPage: 0,
            totalPages: 0,

            isDetailsActive: false,

            isDeleteFailed: false,
            isDeleteSuccessful: false,
        };
    }

    componentDidMount() {
        this.loadCareReceivers(this.state.currentPage, AuthenticationService.getInstitution());
    }

    loadCareReceivers(pageNumber, institutionName) {
        CareReceiverService.getByInstitution(pageNumber, institutionName).then(response => {
            let rows = response.data.content.map(careReceiver => {
                return (
                    <tr key={careReceiver.careReceivername}>
                        <td className="users-table-cell">{careReceiver.title} {careReceiver.lastName} {careReceiver.firstName}
                            {careReceiver.middleName}</td>
                        <td className="users-table-cell">{careReceiver.birthDate}</td>
                        <td className="users-table-cell">{careReceiver.mothersName}</td>
                        <td><input type="button" value="Adatok Megtekintése"
                                   onClick={() => this.loadDetails(careReceiver.firstName, careReceiver.lastName,
                                       careReceiver.mothersName, careReceiver.birthDate)}
                                   className="delete-button"/>
                        </td>
                    </tr>
                );
            });
            let currentPage = response.data.pageable.pageNumber;
            let totalPages = response.data.totalPages;
            this.setState({
                careReceivers: rows,
                currentPage: currentPage,
                totalPages: totalPages
            });
        });
    }

    loadDetails(firstName, lastName, mothersName, birthDate) {
        this.setState({
                isDetailsActive: true,
                firstName: firstName,
                lastName: lastName,
                mothersName: mothersName,
                birthDate: birthDate,
            },
        );
        if (this.careReceiverDetails.current != null) {
            this.careReceiverDetails.current.refreshComponent(firstName, lastName, mothersName, birthDate)
        }
    };

    closeDetails() {
        this.setState({
                isDetailsActive: false,
                firstName: undefined,
                lastName: undefined,
                mothersName: undefined,
                birthDate: undefined,
            },
        );
    };

    render() {

        let pagerArray = new Array(this.state.totalPages).fill(0).map((zero, index) => {
                if (this.state.currentPage === (index)) {
                    return <span className="active">{index + 1}</span>
                } else {
                    return <span onClick={() => this.loadCareReceivers(index)}>{index + 1}</span>
                }
            }
        );

        let pagerNavigationBack = 0 === this.state.currentPage ?
            <span className="active">&laquo;</span> :
            <span onClick={() => this.loadCareReceivers(this.state.currentPage - 1)}>&laquo;</span>;

        let pagerNavigationForward = this.state.totalPages - 1 === this.state.currentPage ?
            <span className="active">&raquo;</span> :
            <span onClick={() => this.loadCareReceivers(this.state.currentPage + 1)}>&raquo;</span>;

        return (

            <div className="users-container">
                <table className="table-main">
                    <thead>
                    <tr>
                        <th className="table-main-header" id="care-receiver-name">Név</th>
                        <th className="table-main-header" id="care-receiver-birth-date">Születési Dátum</th>
                        <th className="table-main-header" id="care-receiver-name-mothers-name">Anyja Neve</th>
                        <th className="table-main-header" id="action">Művelet</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.careReceivers}
                    </tbody>
                </table>

                <div className="pagination">
                    {pagerNavigationBack}
                    {pagerArray}
                    {pagerNavigationForward}
                </div>

                {
                    this.state.isDetailsActive &&
                    <div>
                        <div className="care-receiver-detail-header">
                            <h3 id="care-receiver-detail-title">
                                {this.state.title} {this.state.lastName} {this.state.firstName} {this.state.middleName}
                            </h3>
                            <h3><Link id="care-receiver-detail-close" onClick={() => this.closeDetails()}>&times;</Link></h3>
                        </div>
                        <CareReceiverDetails ref={this.careReceiverDetails} firstName={this.state.firstName}
                                             lastName={this.state.lastName} mothersName={this.state.mothersName}
                                             birthDate={this.state.birthDate}/>
                    </div>
                }
            </div>
        );
    }
}

export default CareReceiversGrid;