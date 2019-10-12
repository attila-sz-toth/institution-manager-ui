import React, {Component} from 'react';
import '../../css/Main.css';
import InstitutionsGrid from "./InstitutionsGrid";
import AddInstitution from "./AddInstitution";

class AdminInstitution extends Component {

    render() {
        return (
            <div className="main-component">
                <h3>Intézmények</h3>
                <InstitutionsGrid/>
                <h3>Új Itézmény hozzáadása</h3>
                <AddInstitution/>
            </div>
        );
    }
}

export default AdminInstitution;