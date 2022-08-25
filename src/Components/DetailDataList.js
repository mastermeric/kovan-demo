import React, { Component } from 'react';

class DetailDataList extends Component {
    render() {
        return (
            <div>
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row">Bike ID</th>
                  <td>{this.props.dataFromParent.bike_id}</td>
                </tr>
                <tr>
                  <th scope="row">Lat</th>
                  <td>{this.props.dataFromParent.lat}</td>
                </tr>
                <tr>
                  <th scope="row">Lon</th>
                  <td>{this.props.dataFromParent.lon}</td>
                </tr>
                <tr>
                  <th scope="row">Vehicle Type</th>
                  <td>{this.props.dataFromParent.vehicle_type}</td>
                </tr>
                <tr>
                  <th scope="row">Android Version</th>
                  <td>{this.props.dataFromParent.android}</td>
                </tr>
                <tr>
                  <th scope="row">IOS Version</th>
                  <td>{this.props.dataFromParent.ios}</td>
                </tr>
                <tr>
                  <th scope="row">Total Bookings</th>
                  <td>{this.props.dataFromParent.total_bookings}</td>
                </tr>
              </tbody>
            </table>
        </div>
        );
    }
}

export default DetailDataList;