import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./components/landing";
import Login from "./components/login";
import Post from "./components/post";
import AddPost from "./components/addPost";
import "./styles.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
        <Route component={Landing} exact path="/" />
          <Route component={Login} path="/login" />
          <Route component={AddPost} path="/addpost" />
          <Route component={Post} path="/:id" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
