import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import Login from "./components/login";
import Watch from "./components/landing";
import MyList from "./components/mylist";
import YourList from "./components/userList";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: 'top center',
  timeout: 5000,
  offset: '30px',
  size: '12px',
  type: 'success',
  // you can also just use 'scale'
  transition: 'scale'
}

function App() {
  return (
    <div>
      <AlertProvider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <Switch>
            {/* <Route component={Landing} exact path="/landing" /> */}
            <Route component={Watch} exact="true" path="/" />
            {/* <Route component={Login} path="/login" />  */}
            {/* <Route component={AddPost} path="/addpost" /> */}
            <Route component={MyList} path="/my-list" />
            <Route component={YourList} path="/:id" />
          </Switch>
        </BrowserRouter>
      </AlertProvider>
    </div>
  );
}

export default App;
