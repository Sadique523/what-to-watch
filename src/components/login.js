import React from "react";
import { providers, firebaseAppAuth } from "./firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

function Login(props) {
  const { user, signOut, signInWithGoogle, history } = props;
  if (user) {
    history.push("/");
    localStorage.setItem("@user", JSON.stringify(user));
  }
  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div>
        <Card style={{ padding: "100px" }}>
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <TextField label="Email" name="email" />
          <br />
          <TextField label="Password" name="password" type="password" />
          <br />
          <div style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              primary={true}
              style={{ marginTop: 20 }}
            >
              Login
            </Button>
          </div>
          <div>
            <i
              onClick={signInWithGoogle}
              style={{ fontSize: 27, cursor: "pointer" }}
              class="icon ion-logo-google"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(Login);
