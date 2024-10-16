import { Autocomplete, Card, CardActions, Chip, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CardBody, CardHeader } from "react-bootstrap";

export function AddTask() {
    const [tasks, setTasks] = useState([])
    const [selectedItem, setSelectedItem] = useState([])
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
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
        // let filteredData = tasks.filter(item => item.id != record.id)  
        // setTasks(filteredData)        
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setData(jsonData);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        // Fetching data from a sample API
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((jsonData) => {
            setData(jsonData); // Store the data in the state
            setLoading(false); // Stop loading when data is fetched
          })
          .catch((err) => {
            setError(err.message); // Handle the error
            setLoading(false); // Stop loading in case of error
          });
      }, []);
    
    return(
        <Card sx={{ padding : "2rem" }}>
            <CardHeader>
                <Typography variant="h4">Task Manager</Typography>
            </CardHeader>
            <CardBody sx={{ padding : "2rem" }}>
                <Autocomplete
                    // getOptionLabel={(task) => task.title}
                    disablePortal
                    options={tasks}
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