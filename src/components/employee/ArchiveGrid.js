import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";

import '../../css/Main.css';
import '../../css/Tables.css';
import '../../css/CareReceiver.css';
import CareReceiverService from "../../services/CareReceiverService";
import AuthenticationService from "../../services/AuthenticationService";
import CareReceiverDetails from "./CareReceiverDetails";

class ArchiveGrid extends Component {
    constructor(props) {
        super(props);
        this.careReceiverDetails = React.createRef();
        this.state = {
            institutionName: AuthenticationService.getInstitution(),
            careReceivers: [],
            currentPage: 0,
            totalPages: 0,

            isDetailsActive: false,

            isDeleteFailed: false,
            isDeleteSuccessful: false,
        };
    }

    componentDidMount() {
        this.loadCareReceivers(this.state.currentPage, this.state.institutionName);
    }

    loadCareReceivers(pageNumber, institutionName) {
        CareReceiverService.getArchiveByInstitution(pageNumber, institutionName).then(response => {
            let rows = response.data.content.map(careReceiver => {
                return (
                    <tr key={careReceiver.careReceivername}>
                        <td className="users-table-cell">{careReceiver.lastName} {careReceiver.firstName}</td>
                        <td className="users-table-cell">{careReceiver.birthDate}</td>
                        <td className="users-table-cell">{careReceiver.mothersName}</td>
                        <td><input type="button" value="Adatok Megtekintése"
                                   onClick={() => this.loadDetails(careReceiver.firstName, careReceiver.lastName,
                                       careReceiver.mothersName, careReceiver.birthDate)}
                                   className="edit-button"/>
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
            this.careReceiverDetails.current.loadCareReceiverDetails(firstName, lastName, mothersName, birthDate)
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
                    return <div className="active">{index + 1}</div>
                } else {
                    return <div onClick={() => this.loadCareReceivers(index, this.state.institutionName)}>
                        {index + 1}
                    </div>
                }
            }
        );

        let pagerNavigationBack = 0 === this.state.currentPage ?
            <div className="active">&laquo;</div> :
            <div onClick={() => this.loadCareReceivers(this.state.currentPage - 1, this.state.institutionName)}>&laquo;</div>;

        let pagerNavigationForward = this.state.totalPages - 1 === this.state.currentPage ?
            <div className="active">&raquo;</div> :
            <div onClick={() => this.loadCareReceivers(this.state.currentPage + 1, this.state.institutionName)}>&raquo;</div>;

        return (

            <div className="users-container">
                <table className="table-main">
                    <thead>
                    <tr>
                        <th className="table-main-header" id="care-receiver-name">Név</th>
                        <th className="table-main-header" id="care-receiver-birth-date">Születési dátum</th>
                        <th className="table-main-header" id="care-receiver-name-mothers-name">Anyja neve</th>
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
                                {this.state.lastName} {this.state.firstName}
                            </h3>
                            <h3><Link id="care-receiver-detail-close" onClick={() => this.closeDetails()}>&times;</Link>
                            </h3>
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

export default ArchiveGrid;