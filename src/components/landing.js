import React from 'react';
import firebase from "firebase";

import { providers, firebaseAppAuth } from "./firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import Card, { Container, InnerContainer, Text, Row, Avatar, Thumbnail, Column } from '../styles';
import Header from './header'

function Landing(props) {
    const [loading, setLoading] = React.useState(true);
    const [itemList, setItemList] = React.useState([]);
    const [uniqueitemList, setUniqueItemList] = React.useState([]);


    React.useEffect(() => {
        let value = {};
        firebase
          .database()
          .ref(`watch-tv/users`)
          .once("value", function(snapshot) {
            value = snapshot.val();
            let array = [];
            if (value) {
                Object.keys(value).forEach(item => {
                    if (value[item].length) {
                        array.push(value[item]);
                    }
                });
                setItemList(array.flat());
                setUniqueItemList(checkDuplicateInObject('name', array.flat()).reverse());
                setLoading(false);
            }
          });
    }, []);

    const checkDuplicateInObject = (propertyName, inputArray) => {
        var seenDuplicate = false,
            testObject = {},
            uniqueArray = [],
            duplicateArray = [];

        inputArray.map(function(item) {
          var itemPropertyName = item[propertyName];
          if (itemPropertyName in testObject) {
            testObject[itemPropertyName].duplicate = true;
            duplicateArray.push(item.name);
            item.duplicate = true;
            seenDuplicate = true;
          }
          else {
            testObject[itemPropertyName] = item;
            uniqueArray.push(item);
            delete item.duplicate;
          }
        });
        

        return uniqueArray;
    }

    const renderStreamingOnLogo = (val) => {
        if(val === 'Netflix') {
            return (
                <Avatar src="https://media-exp1.licdn.com/dms/image/C4E0BAQEVb0ZISWk8vQ/company-logo_200_200/0?e=2159024400&v=beta&t=lTp6-x-KOMbm-8sM1sI78eyu1d8szFF6cDlJHVx0mcE" alt="netflix" />
            )
        }
        else if (val === 'Disney+ Hotstar') {
            return (
                <Avatar src="https://images.news18.com/optimize/wd-Rf9OcaaOS_q9MyQwk11eRhhI=/532x353/images.news18.com/ibnlive/uploads/532x353/jpg/2020/04/disne-hotstar.jpg" alt="prime" />
            )
        }
        else if(val === 'Amazon') {
            return (
            <Avatar src="https://www.mediaplaynews.com/wp-content/uploads/2018/04/Prime-Video-Stacked.jpg" alt="hotstar" />
            )
        }
        else {
            return (
                <Avatar src="https://i.pinimg.com/originals/5c/f6/e8/5cf6e8380f7539e6f444c36c054a6ae3.jpg" alt="hotstar" />
            )
        }
    }
    
    if(loading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <Header authProps={props.user}/>
            <Container>
                <InnerContainer>
                    {/* <h4 style={{paddingLeft: 12}}>Trending</h4> */}
                    {uniqueitemList.map(item => {
                        return (
                            <Card>
                                <Thumbnail width="600" height="400" alt="show-img" src={item.thumbnail} />
                                <Row>
                                <Column>
                                    <Text>{item.name}</Text>
                                    <Text style={{fontSize: 12, marginTop: 10}}>In 2 people's list</Text>
                                    <Text style={{fontSize: 12, color: 'grey', marginTop: 10}}>{item.type}</Text>
                                </Column>  
                                    {renderStreamingOnLogo(item.streamingOn)}
                                </Row>
                            </Card>  
                        )
                    })}
                </InnerContainer>
            </Container>
        </div>
    )
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth
  })(Landing);
  
