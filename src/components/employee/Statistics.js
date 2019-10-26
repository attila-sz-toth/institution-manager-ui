import React, {Component} from "react";
import * as Datetime from 'react-datetime';
import '../../css/Datetime.css';
import CareReceiverService from "../../services/CareReceiverService";

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            careReceivers: "",
            waitingList: "",
            archived: "",

            careReceiverDate: "",
            normativeYear: ""
        };
    }

    componentDidMount() {
        this.loadStatistics();
    }

    loadStatistics() {
        CareReceiverService.countCareReceivers().then(response => {
                this.setState({careReceivers: response.data});
            }
        );

        CareReceiverService.countWaitingList().then(response => {
                this.setState({waitingList: response.data});
            }
        );

        CareReceiverService.countArchive().then(response => {
                this.setState({archived: response.data});
            }
        );
    }

    careReceiverFromDateChange(date) {
        let dateProperty = date._d;
        if (this.state.careReceiverToDate !== undefined) {
            CareReceiverService.countCareReceiversByDate(dateProperty, this.state.careReceiverToDate).then(response => {
                    this.setState({careReceiverDate: response.data.count});
                }
            );
        }
        this.setState({
            careReceiverFromDate: dateProperty
        });
    }

    careReceiverToDateChange(date) {
        let dateProperty = date._d;
        if (this.state.careReceiverFromDate !== undefined) {
            CareReceiverService.countCareReceiversByDate(this.state.careReceiverFromDate, dateProperty).then(response => {
                    this.setState({careReceiverDate: response.data.count});
                }
            );
        }
        this.setState({
            careReceiverToDate: dateProperty
        });
    }

    normativeYearDateChangeChange(date) {
        let dateProperty = date._d;
        CareReceiverService.normativeByYear(dateProperty).then(response => {
                this.setState({normativeYear: response.data.count});
            }
        );
        this.setState({
            normativeYearDate: dateProperty
        });
    }

    render() {
        return (
            <table className="table-main institution-details">
                <tr>
                    <th className="table-main-header institution-details-header">
                        Jelenlegi ellátottak száma
                    </th>
                    <td className="institution-details-content">
                        {this.state.careReceivers}
                    </td>
                </tr>

                <tr>
                    <th className="table-main-header institution-details-header">
                        Várólistán lévők száma
                    </th>
                    <td className="institution-details-content">
                        {this.state.waitingList}
                    </td>
                </tr>

                <tr>
                    <th className="table-main-header institution-details-header">
                        Megszűnt ellátások száma
                    </th>
                    <td className="institution-details-content">
                        {this.state.archived}
                    </td>
                </tr>
                <tr>
                    <th className="table-main-header institution-details-header">
                        Ellátottak száma adott időszakra
                        <div className="statistics-header">
                            Időszak kezdete:
                            <Datetime
                                value={this.state.careReceiverYearDate}
                                dateFormat="YYYY. MM. DD."
                                timeFormat=""
                                onChange={(date) => this.careReceiverFromDateChange(date)}
                            />
                        </div>
                        <div className="statistics-header">
                            Időszak vége:
                            <Datetime
                                value={this.state.careReceiverYearDate}
                                dateFormat="YYYY. MM. DD."
                                timeFormat=""
                                onChange={(date) => this.careReceiverToDateChange(date)}
                            />
                        </div>
                    </th>
                    <td className="institution-details-content">
                        {this.state.careReceiverDate}
                    </td>
                </tr>
                <tr>
                    <th className="table-main-header institution-details-header">
                        Állami normatíva adott évre
                        <div className="statistics-header">
                            Év:
                            <Datetime
                                value={this.state.normativeYearDate}
                                dateFormat="YYYY"
                                onChange={(date) => this.normativeYearDateChangeChange(date)}
                            />
                        </div>
                    </th>
                    <td className="institution-details-content">
                        {this.state.normativeYear}
                    </td>
                </tr>
            </table>
        );
    };
}

export default Statistics;