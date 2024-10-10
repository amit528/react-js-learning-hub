import FormComponent from "./commonComponents/Form";
import inputDetails from "../data/FormFields.json"
import { useEffect, useState } from "react";
import ListComponent from "./commonComponents/List";
import { Grid2, Button} from "@mui/material";
import { initial } from "../data/InitialValues";

function Village() {
    const [rows, setRows] = useState([])
    const [entity, setEntity] = useState(initial("village"))
    const [mode, setMode] = useState("list")
    
    const columns = [
        { field: 'id', headerName: 'Id', width: 40, flex : 1 },
        { field: 'completed', headerName: 'Division', minWidth : 150, width: 150, flex : 1 },
        { field: 'title', headerName: 'District', minWidth : 200, width: 150, flex : 1 },
        { field: 'userId', headerName: 'Village', minWidth : 150, width: 150, flex : 1 },
    ];

    useEffect(() =>{
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => setRows(json))
    },[])

    const handleAddClick = () =>{
        setMode("form")
    }

    const backToList = (value) =>{
        setMode(value)
    }

    return(
        <Grid2 container gap={2}>
            {mode === "list" && 
            <>
                <Grid2 columns={4}>
                    <Button fullWidth variant="contained" onClick={() => handleAddClick()}>ADD</Button>
                </Grid2>
                <ListComponent
                    rows={rows}
                    columns={columns}
                />
            </>
            }
            {mode === "form" && 
                <FormComponent 
                    inputDetails={inputDetails.village}
                    entity={entity}
                    setRows={setRows}
                    backToList={backToList}
                />
            }
        </Grid2>
    )
}

export default Village;