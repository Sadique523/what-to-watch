import React from "react";
import firebase from "firebase";
import { providers, firebaseAppAuth } from "./firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import Moment from "react-moment";
import {
  Container,
  PostContainer,
  Header,
  AddPostContainer,
  Button,
  Select,
  Posts
} from "./styles";
function Landing(props) {
  const [title, setTitle] = React.useState();
  const [thread, setThread] = React.useState("r/exams");
  const [itemList, setItemList] = React.useState([]);
  React.useEffect(() => {
    let value = {};
    firebase
      .database()
      .ref(`thread`)
      .once("value", function(snapshot) {
        value = snapshot.val();
        let array = [];
        if (value) {
          Object.keys(value).forEach(item => array.push(value[item]));
          setItemList(array);
        }
      });
  }, []);
  const createPost = () => {
    firebase
      .database()
      .ref(`thread/${itemList.length + 1}`)
      .update({
        id: itemList.length + 1,
        name: title,
        thread: thread,
        time: new Date(),
        user: JSON.parse(localStorage.getItem("@user")).displayName,
        vote: 0
      })
      .then(data => {
        //success callback
        console.log("data ", data);
      })
      .catch(error => {
        //error callback
        console.log("error ", error);
      });
    props.history.push("/");
  };

  const onChangeTitle = e => {
    setTitle(e.target.value);
  };
  // const onChangeDescription = e => {
  //   setDescription(e.target.value);
  // };
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
        <Posts>
          <AddPostContainer>
            <input value={title} onChange={onChangeTitle} placeholder="Title" />
            <textarea
              // value={title}
              // onChange={onChangeTitle}
              name="description"
              type="text"
              placeholder="Description"
            />
            <Select onChange={e => setThread(e.target.value)}>
              <option>r/exams</option>
              <option>r/college-fests</option>
            </Select>
            <div style={{ textAlign: "right" }}>
              <Button onClick={() => createPost()}>Post</Button>
            </div>
          </AddPostContainer>
        </Posts>
      </PostContainer>
    </Container>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(Landing);
