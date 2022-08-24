import React from 'react';
import { useEffect,useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory,{textFilter} from 'react-bootstrap-table2-filter';

const DataList = () => {

    
  const myColumns = [
    {
        dataField : "postId" ,
        text:"post Id",
        sort:true
        //validator : numericValidator
    },
    {
        dataField : "name" ,
        text:"İSİM",
        sort:true,
        filter:textFilter()
    },
    {
    dataField : "email" ,
    text:"Email",
    sort:true,
    editable : false // Bu Column icin Edit yapilamaz !
    },
    {
        dataField : "body" ,
        text:"Body",
        sort:true,
        //formatter: emailFormatter,
    },        
    //-----------  SECENEK ICIN DROPDOWN EKLE ----------------
    // {
    //     dataField : "dropdown" ,
    //     text:"Dropdown",
    //     editor : {
    //         type:Type.SELECT,
    //         options : [
    //             {value:"secenek-1" , label:"secenek-1"},
    //             {value:"secenek-2" , label:"secenek-2"}
    //         ]
    //     }
    // }
    //---------------------------------------------------------
]

    return (
        <div>
            
        </div>
    );
};

export default DataList;