import React, {Component} from 'react';
import '../../css/Main.css';
import InstitutionsGrid from "./InstitutionsGrid";
import AddInstitution from "./AddInstitution";
import {Link} from "react-router-dom";

class AdminInstitution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addInstitutionOpenClose: <span>&#129035;</span>,
            addInstitutionActive: false,
        };
    }

    setAddInstitutionVisibility() {
        if (this.state.addInstitutionActive) {
            this.setState({
                addInstitutionOpenClose: <span>&#129035;</span>,
                addInstitutionActive: false
            });
        } else {
            this.setState({
                addInstitutionOpenClose: <span>&#129033;</span>,
                addInstitutionActive: true
            });
        }
    }

    render() {
        return (
            <div className="main-component">
                <h3>Intézmények</h3>
                <InstitutionsGrid/>
                <div className="care-receiver-detail-header">
                    <h3>Új Itézmény hozzáadása</h3>
                    <h3><Link id="care-receiver-detail-close" onClick={() => this.setAddInstitutionVisibility()}>
                        {this.state.addInstitutionOpenClose}
                    </Link>
                    </h3>
                </div>
                {
                    this.state.addInstitutionActive &&
                    <AddInstitution/>
                }
            </div>
        );
    }
}

export default AdminInstitution;