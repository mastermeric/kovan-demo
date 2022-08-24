import './App.css';
import { useEffect,useState } from "react";
import { ApolloClient, InMemoryCache, useQuery, gql,ApolloProvider } from '@apollo/client';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory,{textFilter} from 'react-bootstrap-table2-filter';

const PAGE_SIZE = 3;

const LIS_RESULT = gql`
query {
    items {
      data {
        bikes{
          bike_id
          vehicle_type
        }
      }
    }
}
`;


function App(props) {

  const {data,loading,error } = useQuery(LIS_RESULT); 

  // useEffect(() => {    
  //   setMyData(data.items.data.bikes);

  // }, [])

  const [endCursor, setEndCursor] = useState("");
  const [myData, setMyData] = useState([]);
 
  // GRAPHQL Data getir..
  const _client = props.clientProp;

  if(loading) {
    return <div> Yükleniyor..</div>
  }
    
  console.log("---- GRAPH API den GELEN DATA  -----");
  console.log(data.items.data.bikes);

  if(data == null  || data.items.data.bikes.length < 1) {
    return <div> BEKLENMEDİK BİR HATA OLDU. TEKRAR DENEYİN !</div>
  }
  
  if(error) {
    console.log("HATA ! " + error);
    return <div> error </div>
  }

  const myColumns = [
    {
        dataField : "bike_id",
        text:"bike_id",        
        sort:true,
        filter:textFilter()
        //validator : numericValidator
    },
    {
        dataField : "vehicle_type" ,
        text:"vehicle_type type",
        sort:true,
        filter:textFilter()
    }
  ]

  const tempData= data.items.data.bikes.map((bike) => {
    return (
      {
        bike_id: bike.bike_id,
        vehicle_type: bike.vehicle_type,
      });
    });

    console.log("---- GELEN DATA - 2  -----");
    console.log(tempData);
  

  return (
    
    <div className="App">

      <h2> BIKE LIST</h2>


       <BootstrapTable
        keyField='bike_id'
        //data={data.items.data.bikes}
        data={ tempData}
        columns= {myColumns}
        striped
        hover
        condensed
        pagination={paginationFactory()}
        >
        </BootstrapTable> 
        
    </div>
  );
}

export default App;
