import React from "react";
import firebase from "firebase";
import { providers, firebaseAppAuth } from "./firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import Moment from "react-moment";

import {
  Container,
  SideBar,
  List,
  ListItem,
  PostContainer,
  Posts,
  Post,
  PostContent,
  Header,
  FAB,
  PostStuff,
  VoteCount,
  TimeFilter,
  Count,
  LikeCount,
  CommentsCount
} from "./styles";
function Landing(props) {
  const [active, setActive] = React.useState("hot");
  const [loading, setLoading] = React.useState(true);
  const [itemList, setItemList] = React.useState([]);
  // console.log(itemList);
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
          setLoading(true);
        }
      });
  }, [loading]);

  const createPost = () => {
    firebase
      .database()
      .ref(`thread/${itemList.length + 1}`)
      .update({
        id: itemList.length + 1,
        name: "Keanu Reevs and River Phoenix in LA",
        thread: "r/college-fest",
        time: new Date(),
        user: "sadique galaria",
        vote: 0,
        comments: []
      })
      .then(data => {
        //success callback
        console.log("data ", data);
      })
      .catch(error => {
        //error callback
        console.log("error ", error);
      });
    setLoading(false);
  };

  const updatePostVote = (e, post, calc) => {
    e.stopPropagation();
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

    setLoading(false);
  };

  const addLike = post => {
    console.log(post);
    firebase
      .database()
      .ref(`thread/${post.id}/like/${post.like ? post.like.length : 0}`)
      .update({
        id: post.like ? post.like.length : 0,
        uid: JSON.parse(localStorage.getItem("@user")).uid,
        user: JSON.parse(localStorage.getItem("@user")).displayName,
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
    setLoading(false);
  };

  return (
    <Container>
      <SideBar>
        <div style={{ padding: 20 }}>
          <img
            width="100"
            height="auto"
            src="http://www.vectorico.com/download/social_media/Reddit-logo.png"
            alt="img"
          />
        </div>
        <List>
          <ListItem
            onClick={() => setActive("hot")}
            active={active === "hot" ? true : false}
          >
            <i className="icon ion-md-flame" />
            Hot
          </ListItem>

          {/* <ListItem
            onClick={() => setActive("rising")}
            active={active === "rising" ? true : false}
          >
            <i className="icon ion-md-jet" />
            Rising
          </ListItem>
          <ListItem
            onClick={() => setActive("top")}
            active={active === "top" ? true : false}
          >
            <i className="icon ion-md-arrow-round-up" />
            Top
          </ListItem> */}
        </List>
        <List style={{ borderTop: "1px solid #e1e2e3" }}>
          <ListItem
            style={{ color: "black" }}
            onClick={() => props.history.push("/addpost")}
          >
            <i className="icon ion-md-add-circle" />
            Create New Post
          </ListItem>
        </List>
      </SideBar>
      <PostContainer>
        <Header>
          <div style={{ display: "flex" }}>
            <p style={{ fontWeight: "bold" }}>Hot</p>
            <TimeFilter>
              PAST 24 HOURS
              <i className="icon ion-md-arrow-dropdown" />
            </TimeFilter>
            <FAB onClick={() => props.history.push("/addpost")}>
              <i className="icon ion-md-add" />
            </FAB>
          </div>

          {/* <div
            style={{
              display: "flex",
              minWidth: 100,
              justifyContent: "space-between"
            }}
          >
            <div style={{ fontSize: 25 }}>
              <i className="icon ion-md-heart" />
            </div>
           
          </div> */}
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
          {itemList
            ? itemList.map(post => (
                <Post onClick={() => props.history.push(`/${post.id}`)}>
                  <PostContent>
                    <img
                      width="100px"
                      height="75px"
                      src="https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                      alt="abc"
                    />
                    <div>
                      <p>{post.name}</p>
                      <p
                        style={{
                          color: "grey",
                          fontSize: 12,
                          paddingTop: 10
                        }}
                      >
                        submitted <Moment fromNow>{post.time}</Moment> by{" "}
                        {post.user}
                      </p>
                      <p style={{ fontSize: 12, paddingTop: 5 }}>
                        {post.thread}
                      </p>
                      <Count>
                        {/* <LikeCount>
                          <i className="icon ion-md-heart" />{" "}
                          {post.like ? post.like.length : 0}
                        </LikeCount> */}
                        <CommentsCount>
                          <i className="icon ion-md-chatbubbles" />{" "}
                          {post.comments ? post.comments.length : 0}
                        </CommentsCount>
                      </Count>
                    </div>
                  </PostContent>
                  <PostStuff>
                    <VoteCount>
                      <i
                        class="icon ion-md-arrow-dropup"
                        onClick={e => updatePostVote(e, post, "add")}
                      />
                      {post.vote}
                      <i
                        class="icon ion-md-arrow-dropdown"
                        onClick={e => updatePostVote(e, post, "subtract")}
                      />
                    </VoteCount>
                  </PostStuff>
                </Post>
              ))
            : null}
        </Posts>
      </PostContainer>
    </Container>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(Landing);
