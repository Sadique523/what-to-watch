import React from 'react';
import firebase from "firebase";
import { providers, firebaseAppAuth } from "./firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import Card, { Container, InnerContainer, Text, Row, Avatar, Thumbnail, Column } from '../styles';
import Header from './header'

function MyList(props) {
    const [loading, setLoading] = React.useState(true);
    const [itemList, setItemList] = React.useState([]);
    const hiddenEl = React.useRef(null);

    React.useEffect(() => {
        let value = {};
        firebase
          .database()
          .ref(`watch-tv/users/${JSON.parse(localStorage.getItem('@user')).uid}`)
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

    console.log(props);

    const shareLink = str => {
        const el = document.createElement('textarea');  // Create a <textarea> element
        el.value = str;                                 // Set its value to the string that you want copied
        el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
        el.style.position = 'absolute';                 
        el.style.left = '-9999px';                      // Move outside the screen to make it invisible
        document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
        const selected =            
          document.getSelection().rangeCount > 0        // Check if there is any content selected previously
            ? document.getSelection().getRangeAt(0)     // Store selection if found
            : false;                                    // Mark as false to know no selection existed before
        el.select();                                    // Select the <textarea> content
        document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
        document.body.removeChild(el);                  // Remove the <textarea> element
        if (selected) {                                 // If a selection existed before copying
          document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
          document.getSelection().addRange(selected);   // Restore the original selection
        }
      };
    return (
        <div>
            <Header/>
            <div style={{padding: '20px 50px'}}>
                    <h2>My List</h2><i class="share" />
                    <h5 style={{padding: '10px 0px 15px 0px', color: 'grey'}}>{itemList.length} results</h5>    
                    <h4 style={{cursor: 'pointer'}} onClick={() => shareLink(`${window.location.origin}/${JSON.parse(localStorage.getItem('@user')).uid}`)}>
                        <i style={{paddingRight: 10}} className="fa fa-share"></i>
                        Share your List 
                    </h4>
                </div>
            <Container>
                <InnerContainer style={{width: '80%', flexDirection: 'row', flexWrap: 'wrap'}}>
                    {itemList.map(item => {
                        return (
                            <Card style={{width: 350, height: 300}}>
                                <Thumbnail style={{width: '100%', height: 220, objectFit: 'contain'}} alt="show-img" src={item.thumbnail} />
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
        </div>
    )
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth
  })(MyList);
  
