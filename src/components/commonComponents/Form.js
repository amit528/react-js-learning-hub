import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

function FormComponent(props) {
    const [entity, setEntity] = useState(props.entity)
    const [count, setCount] = useState(0)
    const [error, setError] = useState({})

    const onValueChange = (e) =>{
        setEntity({...entity, [e.target.name] : e.target.value})
    }

    const validate = (values) =>{
        const error = {}
        console.log(values);
        
        if(values.division === ""){
            error.division = "Division is required"
        }
        if(values.district === ""){
            error.district = "District is required"
        }
        if(values.village === ""){
            error.village = "Village is required"
        }
        return error
    }

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    const handleSubmit = () =>{

        let validationResult = validate(entity)
        setError(validationResult)
        if (!isEmpty(validationResult)) {
            return;
          }
        let array = JSON.parse(localStorage.getItem("productData")) || []
        console.log(array, typeof(array));
        entity.id = count + 1
        setCount(entity.id)
        array.unshift(entity)
        props.setRows(array)
        localStorage.setItem("productData", JSON.stringify(array))
        toast.success("Data addedd successfully", {
            icon: "🚀"
        })
    }

    const handleCancel = () =>{
        props.backToList("list")
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
                        <Typography variant="h5" color="red">{error[item.name]}</Typography>
                    </Grid>
                )
            })}
            
            <Grid item sm={12} md={12} lg={2} sx={{ display : "flex", alignItems : "center" }}>
                <Button fullWidth size="large" variant="contained" onClick={() => handleCancel()}>Cancel</Button>
            </Grid>
            <Grid item sm={12} md={12} lg={2} sx={{ display : "flex", alignItems : "center" }}>
                <Button fullWidth size="large" variant="contained" onClick={() => handleSubmit()}>Submit</Button>
            </Grid>
        </Grid>
    )
}

export default FormComponent;