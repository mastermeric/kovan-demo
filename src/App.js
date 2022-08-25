import { useEffect,useState } from "react";
import { useQuery, gql } from '@apollo/client';

import  "../src/styles.css"
import Table from 'Components/Table';

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


function App() {

  const {data,loading,error } = useQuery(LIS_RESULT);   
 
  if(loading) {
    return <div> Yükleniyor..</div>
  }  

  if(data == null || data.items.data.bikes == null) {
    return <>
        <h2>ANLIK SUNUCU HATASI</h2>
        <h3>Anlık bir hata oluştu. Lütfen Tekrar deneyin.</h3>
    </>
  }
  
  if(error) {
    console.log("HATA ! " + error);    
    return <div> {error} </div>
  } else {

    const myColumns = [
        {
          header : "bike_id",
          accessor:"bike_id"
        },
        {
          header : "vehicle_type" ,
          accessor:"vehicle_type type"
        }]
    
        console.log("---- GELEN DATA  -----");
        console.log(data.items.data.bikes);
    
        // if(data == null) {
        //     return (    
        //         <div className="App">
        //           <h1>ANLIK HATA</h1>
        //           <h2>Anlık bir hata oluştu. Tekrar deneyin.</h2>
        //         </div>
        //       );
        // }

      const tempData = data.items.data.bikes.map((bike) => {
        return (
          {
            bike_id: bike.bike_id,
            vehicle_type: bike.vehicle_type,
          });
        });
    
    
    
        if(tempData == null) {
            return (    
                <div className="App">
                  <h1>ANLIK HATA</h1>
                  <h2>Anlık bir hata oluştu. Tekrar deneyin.</h2>
                </div>
              );
        } else {
            return (    
                <div className="App">
                  <Table sentContent = {tempData}  />
                </div>
              );
        }
  }

  
}

export default App;
