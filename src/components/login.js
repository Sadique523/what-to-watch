import React from "react";
import { providers, firebaseAppAuth } from "./firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import Moment from "react-moment";
import {
  Container,
  PostContainer,
  Header,
  Input,
  AddPostContainer,
  Button,
  Select,
  Posts
} from "./styles";

function Login(props) {
  const { user, signOut, signInWithGoogle, history } = props;
  // if (user) {
  //   history.push("/");
  //   localStorage.setItem("@user", JSON.stringify(user));
  // }
  return (
    <Container>
      <PostContainer>
        <Header>
          <div style={{ display: "flex" }}>
            <img
              onClick={() => props.history.push("/")}
              width="100"
              height="auto"
              src="http://www.vectorico.com/download/social_media/Reddit-logo.png"
              alt="img"
            />
          </div>
          {JSON.parse(localStorage.getItem("@user")) ? (
            <img
              style={{ borderRadius: "50%" }}
              width="30px"
              height="30px"
              alt="img"
              src={JSON.parse(localStorage.getItem("@user")).photoURL}
            />
          ) : null}
        </Header>
        <Posts style={{ display: "flex", flexDirection: "column" }}>
          <h1>Login</h1>
          <Input
            style={{ borderBottom: "1px solid #e1e2e3" }}
            label="Email"
            name="email"
          />
          <br />
          <Input
            style={{ borderBottom: "1px solid #e1e2e3" }}
            label="Password"
            name="password"
            type="password"
          />
          <br />
          <div>
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
        </Posts>
      </PostContainer>
    </Container>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(Login);
