import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

function FormComponent(props) {
    const [entity, setEntity] = useState({})
    const [count, setCount] = useState(0)

    const onValueChange = (e) =>{
        setEntity({...entity, [e.target.name] : e.target.value})
    }

    const handleSubmit = () =>{
        let array = JSON.parse(localStorage.getItem("productData")) || []
        console.log(array, typeof(array));
        entity.id = count + 1
        setCount(entity.id)
        array.push(entity)
        props.setRows(array)
        localStorage.setItem("productData", JSON.stringify(array))
    }

    return(
        <Grid container spacing={2} mt={2}>
            <Grid item sm={12} md={12} lg={12}>
                <Typography variant="h2">{props.inputDetails.title}</Typography>
            </Grid>
            {props.inputDetails.inputInfo.map((item, index) => {
                return(
                    <Grid item sm={12} md={12} lg={4} key={index}>
                        <TextField
                            required={item.required}
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