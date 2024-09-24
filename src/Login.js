import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

function Login(props) {
    const [userDetails, setUserDetails] = useState({
        username : "",
        password : ""
    })

    function onChangeHandler(e) {        
        setUserDetails({...userDetails, [e.target.name] : e.target.value})
    }    

    function handleLogin() {
        if(userDetails.username === ""){
            alert("Username is required")
            return
        }
        if(userDetails.password === ""){
            alert("Password is required")
            return
        }

        props.setIsLoggedIn(true)
    }
    return(
        <Grid container spacing={2}>
            <Grid item sm={12}>
                <Typography variant="h3">Hi I am login page</Typography>
            </Grid>
            <Grid item sm={4}>
                <TextField
                    required
                    label="Username"
                    id="username"
                    value={userDetails.username}
                    name="username"
                    onChange={(e) => onChangeHandler(e)}
                />
            </Grid>
            <Grid item sm={4}>
                <TextField 
                    required
                    label="Password"
                    id="pasword"
                    value={userDetails.password}
                    name="password"
                    onChange={(e) => onChangeHandler(e)}
                />
            </Grid>
            <Grid item sm={12}>
                <Button variant="contained" onClick={() => handleLogin()}>Login</Button>
            </Grid>
        </Grid>
    )
}

export default Login;