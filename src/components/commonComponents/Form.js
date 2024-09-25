import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

function FormComponent(props) {
    const [entity, setEntity] = useState({})

    const onValueChange = (e) =>{
        setEntity({...entity, [e.target.name] : e.target.value})
    }

    const handleSubmit = () =>{
        console.log(entity);
    }

    return(
        <Grid container spacing={2}>
            {props.inputDetails.map((item) => {
                return(
                    <Grid item sm={12} md={12} lg={4}>
                        <TextField
                            fullWidth
                            name={item.name}
                            label={item.lable}
                            id={item.id}
                            value={entity[item.name]}
                            onChange={(e) => onValueChange(e)}
                            />
                    </Grid>
                )
            })}
            
            
            <Grid item sm={12} md={12} lg={4}>
                <Button variant="contained" onClick={() => handleSubmit()}>Submit</Button>
            </Grid>
        </Grid>
    )
}

export default FormComponent;