import AuthenticationService, {EMPLOYEE_ROLE} from "../../services/AuthenticationService";
import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import CareReceiversGrid from "./CareReceiversGrid";
import WaitingListGrid from "./WaitingListGrid";
import ArchiveGrid from "./ArchiveGrid";

class CareReceivers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            careReceiversGridActive: true,
            waitingListGridOpenClose: <span>&#129035;</span>,
            waitingListGridActive: false,
            archiveGridOpenClose: <span>&#129035;</span>,
            archiveGridActive: false
        };
    }

    setWaitingListVisibility() {
        if (this.state.waitingListGridActive) {
            this.setState({
                waitingListGridOpenClose: <span>&#129035;</span>,
                waitingListGridActive: false
            });
        } else {
            this.setState({
                waitingListGridOpenClose: <span>&#129033;</span>,
                waitingListGridActive: true
            });
        }
    }

    setArchiveVisibility() {
        if (this.state.archiveGridActive) {
            this.setState({
                archiveGridOpenClose: <span>&#129035;</span>,
                archiveGridActive: false
            });
        } else {
            this.setState({
                archiveGridOpenClose: <span>&#129033;</span>,
                archiveGridActive: true
            });
        }
    }

    render() {
        if (AuthenticationService.getRole() === EMPLOYEE_ROLE) {
            return (
                <div className="main-component">
                    <h3>Ellátottak</h3>
                    {
                        this.state.careReceiversGridActive &&
                        <CareReceiversGrid/>
                    }
                    <div className="care-receiver-detail-header">
                        <h3>Várólista</h3>
                        <h3><Link id="care-receiver-detail-close" onClick={() => this.setWaitingListVisibility()}>
                            {this.state.waitingListGridOpenClose}
                        </Link>
                        </h3>
                    </div>
                    {
                        this.state.waitingListGridActive &&
                        <WaitingListGrid/>
                    }
                    <div className="care-receiver-detail-header">
                        <h3>Archívum</h3>
                        <h3><Link id="care-receiver-detail-close" onClick={() => this.setArchiveVisibility()}>
                            {this.state.archiveGridOpenClose}
                        </Link>
                        </h3>
                    </div>
                    {
                        this.state.archiveGridActive &&
                        <ArchiveGrid/>
                    }
                </div>
            );
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default CareReceivers;