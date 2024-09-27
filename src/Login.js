import { Box, Button, Grid, TextField, Typography } from "@mui/material";
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
        sessionStorage.setItem("isLoggedIn", true)
        props.handleMenu("dashboard")
    }
    return(
        <Box 
            sx={{
                backgroundColor : "blue",
                p : 5,
                borderRadius : 5,
                color : "#fff",
                width : "40%",
                margin : "auto",
                justifyContent : "center",
                alignItems : "center"
            }}
        >
            <Grid item sm={12}>
                <Typography variant="h3">Hi I am login page</Typography>
            </Grid>
            <Grid item sm={12}>
                <TextField
                    fullWidth
                    required
                    label="Username"
                    id="username"
                    value={userDetails.username}
                    name="username"
                    onChange={(e) => onChangeHandler(e)}
                />
            </Grid>
            <Grid item sm={12}>
                <TextField
                    fullWidth
                    required
                    label="Password"
                    id="pasword"
                    value={userDetails.password}
                    name="password"
                    onChange={(e) => onChangeHandler(e)}
                />
            </Grid>
            <Grid item sm={12}>
                <Button fullWidth variant="contained" onClick={() => handleLogin()}>Login</Button>
            </Grid>
        </Box>
    )
}

export default Login;