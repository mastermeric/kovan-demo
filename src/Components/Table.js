import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
//import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

import { Button } from "react-bootstrap";
import paginationFactory, { SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import Modal from './Modal';
import { useState } from "react";
const { SearchBar } = Search;

let nameFilter;
let priceFilter;
// let stockFilter;
// let originFilter;

const ClearButton = props => {
  const handleClick = () => {
    props.onSearch("");
    props.clearAllFilter();
  };
  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      style={{
        fontSize: "16px",
        padding: "5px",
        margin: "10px",
        height: "40px"
      }}
    >
      Clear
    </Button>
  );
};


const options = {
  sizePerPageList : [ 
    { text: '5', value: 5}, 
    { text: '10', value: 10}, 
    { text: '15', value: 15},
    { text: '25', value: 25},
    { text: '50', value: 50},
  ]
};


class Table extends React.Component {

  constructor() {
    super();

    
    this.state = {
      
      columns : [
        {
          dataField: "bike_id",
          text: "",
          filter: textFilter({
            placeholder:"Bike ID..",
            getFilter: filter => {
              nameFilter = filter;
            }
          })
        },
        {
          dataField: "vehicle_type",
          text: "",          
          filter: textFilter({
            placeholder:"Vehicle Type..",
            getFilter: filter => {
              priceFilter = filter;
            }
          }),
          sort: true
        },
        {
          dataField: "Detail",
          text: "DETAY İŞLEM",
          formatter: this.linkToDetay,
          sort: true
        }
      ],

      detailData : {},
      bikeID : ""
    };

    
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = (e) => {
    this.setState({ show: true });
    console.log(e);
  };

  hideModal = () => {
    this.setState({ show: false });
  };


  linkToDetay = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Button
        onClick={() => {          
          fetch("https://kovan-dummy-api.herokuapp.com/items?bike_id="+row.bike_id)
          .then(response => response.json())
          .then((json) => {
            
            //JSON sonucuna bak..
            console.log(json.data.bike);            
            
            //State i güncelle..
            //Todo : Class component yerine Function component yapılabilir.
            this.setState({ detailData: json.data.bike });
            
            this.showModal(this);
          });
        }}
      >
        DETAY
      </Button>
    );
  };

  clearAllFilter() {
    nameFilter("");
    priceFilter("");
    // originFilter("");
    // stockFilter("");
  }



  render() {

    //todo : 
    //props can be moved to ContextAPI
    const products =this.props.sentContent;

    return (
      <div>

        <Modal show={this.state.show} handleClose={this.hideModal}>                    

            <>
            <h2> BIKE INFO DETAILS  </h2>
            <br></br>
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row">Bike ID</th>
                  <td>{this.state.detailData.bike_id}</td>
                </tr>
                <tr>
                  <th scope="row">Lat</th>
                  <td>{this.state.detailData.lat}</td>
                </tr>
                <tr>
                  <th scope="row">Lon</th>
                  <td>{this.state.detailData.lon}</td>
                </tr>
                <tr>
                  <th scope="row">Vehicle Type</th>
                  <td>{this.state.detailData.vehicle_type}</td>
                </tr>
                <tr>
                  <th scope="row">Android Version</th>
                  <td>{this.state.detailData.android}</td>
                </tr>
                <tr>
                  <th scope="row">IOS Version</th>
                  <td>{this.state.detailData.ios}</td>
                </tr>
                <tr>
                  <th scope="row">Total Bookings</th>
                  <td>{this.state.detailData.total_bookings}</td>
                </tr>
              </tbody>
            </table>
            </>
{/* 
           <>
            <h2> BIKE INFO DETAILS  </h2>
            <p>{this.state.detailData.bike_id}</p>
            <p>{this.state.detailData.lat}</p>
            <p>{this.state.detailData.lon}</p>
            <p>{this.state.detailData.vehicle_type}</p>
            <p>{this.state.detailData.android}</p>
            <p>{this.state.detailData.ios}</p>
            <p>{this.state.detailData.total_bookings}</p>   
          </>      */}
          
        </Modal>

        <h1>KOVAN STUDIO - BIKE LIST</h1>
        <ToolkitProvider
          bootstrap4
          keyField="bike_id"
          data={products}
          columns={this.state.columns}
          search
        >
          {props => (
            <div>
              <SearchBar
                {...props.searchProps}
                style={{ width: "400px", height: "40px" }}
              />
              <ClearButton
                {...props.searchProps}
                clearAllFilter={this.clearAllFilter}
              />
              <BootstrapTable
                {...props.baseProps}
                filter={filterFactory()}
                noDataIndication="There is no solution"
                striped
                hover
                condensed
                pagination={paginationFactory(options)}
              />
            </div>
          )}
        </ToolkitProvider>
      </div>
    );
  }
}

export default Table;
