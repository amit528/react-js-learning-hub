import { Box, Button, Card, Grid, Grid2, TextField, Typography } from "@mui/material";
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

        props.setAppState("dashboard")
        sessionStorage.setItem("dashboardState", "Dashboard")
    }
    return(
        <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card style={{
                padding: "20px",
                width: 400,
                marginBottom: "30px",
                borderRadius: "20px",
                boxShadow: "5px 10px 18px #888888",
            }}
        >
            <Grid2 container gap={2}>
                <Grid2 item lg={12}>
                    <Typography variant="h3" textAlign={"center"}>SMK SOLUTIONS</Typography>
                </Grid2>
                <Grid2 item lg={12}>
                    <TextField
                        fullWidth
                        required
                        label="Username"
                        id="username"
                        value={userDetails.username}
                        name="username"
                        onChange={(e) => onChangeHandler(e)}
                    />
                </Grid2>
                <Grid2 item sm={12}>
                    <TextField
                        fullWidth
                        required
                        label="Password"
                        id="pasword"
                        value={userDetails.password}
                        name="password"
                        onChange={(e) => onChangeHandler(e)}
                    />
                </Grid2>
                <Grid2 item sm={12}>
                    <Button fullWidth variant="contained" onClick={() => handleLogin()}>Login</Button>
                </Grid2>
            </Grid2>
            </Card>
        </Box>
    )
}

export default Login;