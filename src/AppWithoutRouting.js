import { useState } from "react";
import Login from "./Login";
import NavBar from "./components/NavBar";
import { Home } from "./Home";
import { Box, Grid } from "@mui/material";
import Product from "./components/Product";
import Village from "./components/Village";

function AppWithoutRouter() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [appState, setAppState] = useState("home")

    function handleMenu(menuName) {
        setAppState(menuName)
    }

    return (
        <Box>
            <NavBar handleMenu={handleMenu} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Grid
                container
                spacing={2}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "90vh"
                }}
            >

                {
                    (appState === "home" || appState === "logout") && <Home title="Welcome to SMK SOLUTIONS" />
                }
                {
                    appState === "login" && <Login setIsLoggedIn={setIsLoggedIn} handleMenu={handleMenu} />
                }

                {
                    appState === "dashboard" && <Home title="Welcome to Dashboard" />
                }

                {
                    appState === "product" && <Product />
                }

                {
                    appState === "village" && <Village />
                }
            </Grid>
        </Box>
    )
}

export default AppWithoutRouter;