import FormComponent from "./commonComponents/Form";
import inputDetails from "../data/FormFields.json"
import { useState } from "react";
import ListComponent from "./commonComponents/List";

function Village() {
    const [rows, setRows] = useState(JSON.parse(localStorage.getItem("productData")) || [])

    // const rows = [
    //     { id: 1, division: 'Hello', district: 'World', village : "banahatti", desc : "None" },
    //     { id: 2, division: 'Hello', district: 'World', village : "banahatti", desc : "None" },
    //     { id: 3, division: 'Hello', district: 'World', village : "banahatti", desc : "None" },
    //   ];

    const columns = [
    { field: 'id', headerName: 'Id', width: 40 },
    { field: 'division', headerName: 'Division', width: 150 },
    { field: 'district', headerName: 'District', width: 150 },
    { field: 'village', headerName: 'Village', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    ];

    return(
        <>
        <FormComponent 
            inputDetails={inputDetails.village}
            setRows={setRows}
        />
        <ListComponent
            rows={rows}
            columns={columns}
        />
        </>
    )
}

export default Village;