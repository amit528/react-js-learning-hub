import { useState } from "react";
import Login from "./Login";
import NavBar from "./components/NavBar";
import { Home } from "./Home";

function AppWithoutRouter() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [appState, setAppState] = useState("home")
    
    function handleMenu(menuName) {
        setAppState(menuName)
    }

    return(
       <>
        <NavBar handleMenu={handleMenu} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        
        {
            (appState === "home" || appState === "logout") && <Home />
        }
        {
            appState === "login" && <Login setIsLoggedIn={setIsLoggedIn}/>
        }
       </>
    )
}

export default AppWithoutRouter;