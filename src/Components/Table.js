import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { Button } from "react-bootstrap";
import paginationFactory, { SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import Modal from './Modal';
import DetailDataList from "./DetailDataList";
import ClearButton from "./ClearButton";

const { SearchBar } = Search;

let nameFilter;
let priceFilter;


const myOptions = {
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
      ]
      ,
      detailData : {},
      bikeID : ""
    };

    
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  //this.setState({myOptions : customOptions.myOptions});
  
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
          
          //Detay datayı orjinal API den al.. (GraphQL APi den de alınabilir.)
          fetch("https://kovan-dummy-api.herokuapp.com/items?bike_id="+row.bike_id)
          .then(response => response.json())
          .then((json) => {
            
            //JSON sonucuna bak..
            console.log(json.data.bike);            
            
            //State i güncelle..
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
  }

  render() {

    //todo : props kullanımı çoğalırsa ContextAPI/Redux tercih edilmelidir.
    const products = this.props.sentContent;        
    return (
      <div>

        <Modal show={this.state.show} handleClose={this.hideModal}>                    
            <>
              <h2> BIKE INFO DETAILS  </h2>
              <br></br>
              <DetailDataList dataFromParent = {this.state.detailData} ></DetailDataList>           
            </>          
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
                pagination={paginationFactory(myOptions)}
              />
            </div>
          )}
        </ToolkitProvider>
      </div>
    );
  }
}

export default Table;
