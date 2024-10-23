import React from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./theme/theme";

const AppWithoutRouter = () => {

    const [appState, setAppState] = React.useState(sessionStorage.getItem('appState')? sessionStorage.getItem('appState') : sessionStorage.setItem('appState', 'login'));
    const [mode, setMode] = React.useState('light')

    return (
        <ThemeProvider theme={getTheme(mode)}>
          {(appState == null || appState == 'login') &&
            <Login setAppState={setAppState}  appState={appState}  />
          }
          {appState == 'dashboard' && <Dashboard setAppState={setAppState} appState={appState} mode={mode} setMode={setMode}/>}
        </ThemeProvider>
    );
  }

export default AppWithoutRouter;