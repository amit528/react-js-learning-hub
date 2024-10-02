import React from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

const AppWithoutRouter = () => {

    const [appState, setAppState] = React.useState(sessionStorage.getItem('appState')? sessionStorage.getItem('appState') : sessionStorage.setItem('appState', 'login'));


    return (
        <>
          {(appState == null || appState == 'login') &&
            <Login setAppState={setAppState}  appState={appState}  />
          }
          {appState == 'dashboard' && <Dashboard  setAppState={setAppState} appState={appState} />}
        </>
    );
  }

export default AppWithoutRouter;