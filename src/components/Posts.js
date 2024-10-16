import FormComponent from "./commonComponents/Form";
import inputDetails from "../data/FormFields.json"
import { useEffect, useState } from "react";
import ListComponent from "./commonComponents/List";
import { Grid2, Button} from "@mui/material";
import { initial } from "../data/InitialValues";

function Posts() {
    const [rows, setRows] = useState([])
    const [entity, setEntity] = useState(initial("posts"))
    const [mode, setMode] = useState("list")
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([])

    const columns = [
        { field: 'id', headerName: 'Id', width: 40, flex : 1 },
        { field: 'title', headerName: 'Title', minWidth : 200, width: 150, flex : 1 },
        { field: 'body', headerName: 'Description', minWidth : 150, width: 150, flex : 1 },
        { field: 'userId', headerName: 'User name', minWidth : 150, width: 150, flex : 1, valueFormatter: (value) =>{            
            let userData = users.filter((item) => item.id == value)
            console.log(userData);
                        
            return userData[0].username + ", " + userData[0].name
        } },
    ];

    useEffect(() =>{
        fetchPostsData();
        fetchUserData();
    },[])

    const fetchPostsData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            console.log("posts", jsonData);
            
            setRows(jsonData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();                        
            setUsers(jsonData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
  

    const handleAddClick = () =>{
        setMode("form")
    }

    const backToList = (value) =>{
        setMode(value)
    }

    const inputs = inputDetails.posts.inputInfo.map((item) =>{
        if(item.name == "userId"){
            item.options = users
        }
        return item
    })

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
                    inputDetails={inputs}
                    title={inputDetails.posts.title}
                    entity={entity}
                    setRows={setRows}
                    backToList={backToList}
                />
            }
        </Grid2>
    )
}

export default Posts;