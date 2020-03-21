import React from 'react';
import firebase from "firebase";
import { providers, firebaseAppAuth } from "./firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import Card, { Container, InnerContainer, Text, Row, Avatar, Thumbnail, Column } from '../styles';

function Landing() {
    const [loading, setLoading] = React.useState(true);
    const [itemList, setItemList] = React.useState([]);

    React.useEffect(() => {
        let value = {};
        firebase
          .database()
          .ref(`watch-tv`)
          .once("value", function(snapshot) {
            value = snapshot.val();
            let array = [];
            if (value) {
              Object.keys(value).forEach(item => array.push(value[item]));
              setItemList(array);
              setLoading(false);
            }
          });
    }, []);

    console.log('list', itemList);

    return (
        <Container>
            <InnerContainer>
                {itemList.map(item => {
                    return (
                        <Card>
                            <Thumbnail width="600" height="400" alt="show-img" src={item.thumbnail} />
                            <Row>
                            <Column>    
                                <Text>{item.name}</Text>
                                <Text style={{fontSize: 12, color: 'grey', marginTop: 10}}>{item.type}</Text>
                            </Column>  
                                {item.streamingOn === 'Netflix' ? <Avatar src="https://www.freepnglogos.com/uploads/netflix-logo-circle-png-5.png" alt="netflix" /> : <Avatar src="https://www.mediaplaynews.com/wp-content/uploads/2018/04/Prime-Video-Stacked.jpg" alt="netflix" /> }
                            </Row>
                        </Card>  
                    )
                })}
            </InnerContainer>
        </Container>
    )
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth
  })(Landing);
  
