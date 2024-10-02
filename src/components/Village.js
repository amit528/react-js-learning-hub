import FormComponent from "./commonComponents/Form";
import inputDetails from "../data/FormFields.json"
import { useEffect, useState } from "react";
import ListComponent from "./commonComponents/List";

function Village() {
    const [rows, setRows] = useState([])

    const columns = [
    { field: 'id', headerName: 'Id', width: 40 },
    { field: 'completed', headerName: 'Division', width: 150 },
    { field: 'title', headerName: 'District', width: 150 },
    { field: 'userId', headerName: 'Village', width: 150 },
    ];

    useEffect(() =>{
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => setRows(json))
    })

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