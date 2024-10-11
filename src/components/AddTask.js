import { Autocomplete, Card, CardActions, Chip, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CardBody, CardHeader } from "react-bootstrap";

export function AddTask() {
    const [tasks, setTasks] = useState([])
    const [selectedItem, setSelectedItem] = useState([])

    useEffect(() => {
        getTasks()
    },[])

    function getTasks() {
        fetch("/data.json").then((res) => {            
            if(res.status === 200){
                return res.json()
            }
        }).then((data) => {                      
            setTasks(data.developer.tasks)
        }).catch((error) => {
            console.log(error.message);
        })
    }
    
    const handleDelete = (id) => {
        let filteredData = selectedItem.filter(item => item.id != id)        
        setSelectedItem(filteredData)
    };

    const availableItems = tasks.filter(
        (item) => !selectedItem.some(selectedItem => selectedItem.id === item.id)
    );
    
    function handleSelect(e, record){ 
        setSelectedItem([...selectedItem, record])
        let filteredData = tasks.filter(item => item.id != record.id)  
        setTasks(filteredData)        
    }
    
    return(
        <Card sx={{ padding : "2rem" }}>
            <CardHeader>
                <Typography variant="h4">Task Manager</Typography>
            </CardHeader>
            <CardBody sx={{ padding : "2rem" }}>
                <Autocomplete
                    // getOptionLabel={(task) => task.title}
                    disablePortal
                    options={availableItems}
                    sx={{ width: "auto" }}
                    renderInput={(params) => <TextField {...params} label="Movie" />}
                    onChange={handleSelect}
                />
            </CardBody>

            <CardActions>

            <Stack direction="row" spacing={1}>
                {selectedItem.map((item) =>{
                   return(  
                    <Chip
                        label={item.label}
                        onDelete={() => handleDelete(item.id)}
                    />
                )})}
                </Stack>
            </CardActions>
        </Card>
    )
}