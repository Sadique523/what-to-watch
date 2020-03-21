import React from "react";
import firebase from "firebase";
import { providers, firebaseAppAuth } from "./firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import Moment from "react-moment";
import {
  Container,
  PostContainer,
  Posts,
  Post,
  PostContent,
  PostStuff,
  VoteCount,
  Description,
  Header,
  Comments,
  Button,
  TextArea
} from "./styles";
function Landing(props) {
  const [loading, setLoading] = React.useState(false);
  const [post, setPost] = React.useState([]);
  const [comment, addComment] = React.useState("");
  // console.log(itemList);
  React.useEffect(() => {
    let value = {};
    console.log(props);
    firebase
      .database()
      .ref(`thread/${props.match.params.id}`)
      .once("value", function(snapshot) {
        value = snapshot.val();
        if (value) {
          setPost(value);
          console.log(value);
          setLoading(false);
        }
      });
  }, [loading]);

  const postComment = () => {
    if (comment) {
      firebase
        .database()
        .ref(
          `thread/${props.match.params.id}/comments/${
            post.comments ? post.comments.length : 0
          }`
        )
        .update({
          id: post.comments ? post.comments.length : 0,
          user: JSON.parse(localStorage.getItem("@user"))
            ? JSON.parse(localStorage.getItem("@user")).displayName
            : "anonymous",
          comment: comment,
          time: new Date()
        })
        .then(data => {
          //success callback
          console.log("data ", data);
        })
        .catch(error => {
          //error callback
          console.log("error ", error);
        });
      addComment("");
      setLoading(true);
    }
  };

  const updatePostVote = (post, calc) => {
    if (calc === "add") {
      firebase
        .database()
        .ref(`thread/${post.id}`)
        .update({
          ...post,
          vote: post.vote + 1
        })
        .then(data => {
          //success callback
          console.log("data ", data);
        })
        .catch(error => {
          //error callback
          console.log("error ", error);
        });
    } else {
      firebase
        .database()
        .ref(`thread/${post.id}`)
        .update({
          ...post,
          vote: post.vote - 1
        })
        .then(data => {
          //success callback
          console.log("data ", data);
        })
        .catch(error => {
          //error callback
          console.log("error ", error);
        });
    }
    setLoading(true);
  };

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
          <Post>
            <PostContent>
              <img
                width="100px"
                height="75px"
                src="https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                alt="abc"
              />
              <div>
                <p>{post.name}</p>
                <p style={{ color: "grey", fontSize: 12, paddingTop: 10 }}>
                  submitted <Moment fromNow>{post.time}</Moment> by {post.user}
                </p>
                <p style={{ fontSize: 12, paddingTop: 5 }}>{post.thread}</p>
              </div>
            </PostContent>
            <PostStuff>
              <VoteCount>
                <i
                  class="icon ion-md-arrow-dropup"
                  onClick={e => updatePostVote(post, "add")}
                />
                {post.vote}
                <i
                  class="icon ion-md-arrow-dropdown"
                  onClick={e => updatePostVote(post, "subtract")}
                />
              </VoteCount>
            </PostStuff>
          </Post>
          <Description>{post.description}</Description>
          <Comments>
            Add a comment
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end"
                }}
              >
                <TextArea
                  value={comment}
                  onChange={e => addComment(e.target.value)}
                />
                <Button onClick={() => postComment()}>Post</Button>
              </div>
            </div>
            {post.comments
              ? post.comments.map(obj => (
                  <div>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold",
                          paddingBottom: 10
                        }}
                      >
                        {obj.user} .{" "}
                        <span style={{ color: "grey", fontSize: 12 }}>
                          <Moment fromNow>{obj.time}</Moment>
                        </span>
                      </p>
                      <p>{obj.comment}</p>
                    </div>
                  </div>
                ))
              : null}
          </Comments>
        </Posts>
      </PostContainer>
    </Container>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(Landing);
