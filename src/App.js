import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import Login from "./components/login";
import Watch from "./components/landing";
import MyList from "./components/mylist";
import YourList from "./components/userList";

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
