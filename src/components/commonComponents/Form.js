import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { createPost } from "../../api/methods";

function FormComponent(props) {
    const [entity, setEntity] = useState(props.entity)
    const [count, setCount] = useState(0)
    const [error, setError] = useState({})    

    const onValueChange = (e) =>{
        setEntity({...entity, [e.target.name] : e.target.value})
    }

    const validate = (values) =>{
        const error = {}
        props.inputDetails.map((item) => {
            if(item.required){
                if(values[item.name] == ""){
                    error[item.name] = `${item.lable} is required!`;
                }
            }
        })

        return error
    }

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    // const handleSubmit = () =>{

    //     let validationResult = validate(entity)
    //     setError(validationResult)
    //     if (!isEmpty(validationResult)) {
    //         return;
    //       }
    //     let array = JSON.parse(localStorage.getItem("productData")) || []
    //     console.log(array, typeof(array));
    //     entity.id = count + 1
    //     setCount(entity.id)
    //     array.unshift(entity)
    //     props.setRows(array)
    //     localStorage.setItem("productData", JSON.stringify(array))
    //     toast.success("Data addedd successfully")
    // }

    const handleSubmit = async () => {
        let validationResult = validate(entity)
        setError(validationResult)
        if (!isEmpty(validationResult)) {
            return;
          }
        await createPost(entity).then((res) =>{
            console.log(res);
            
            if(res.id){
                toast.success("Data added successfully")
            }else{
                toast.error("something went wrong!")
            }
            
        })
    }

    const handleCancel = () =>{
        props.backToList("list")
    }   

    return(
        <Grid container spacing={2} mt={2}>
            <Grid item sm={12} md={12} lg={12}>
                <Typography variant="h2">{props.title}</Typography>
            </Grid>
            {props.inputDetails.map((item, index) => {
                return(
                    <Grid item sm={12} md={12} lg={4} key={index}>
                        <TextField
                            required={item.required}
                            fullWidth
                            select={item.type === "select"}
                            name={item.name}
                            label={item.lable}
                            id={item.id}
                            value={entity[item.name]}
                            onChange={(e) => onValueChange(e)}
                            >
                                {
                                    item.type === "select" && item.options.map((option, index) => {
                                        return <MenuItem key={index} value={option.id}>
                                            {option.username}
                                            </MenuItem>
                                    })
                                }
                            </TextField>
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