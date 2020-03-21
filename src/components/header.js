import React from 'react';
import { Button, Column, Input, Select } from '../styles';
import firebase from "firebase";
import { providers, firebaseAppAuth } from "./firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import Modal from 'react-modal';


const modalStyle = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      width: '100%',
      maxWidth: '450px',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
};
function Header() {
    const [itemList, setItemList] = React.useState([]);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [streamingOn, setStreamingOn] = React.useState('Netflix');

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
            }
          });
      }, []);

    const addSuggestion = () => {
        firebase
        .database()
        .ref(`watch-tv/${itemList.length + 1}`)
        .update({
            name,
            tags,
            streamingOn,
            thumbnail: 'https://www.drselectronics.de/wp-content/uploads/2019/11/default-placeholder-1024x1024-960x500.png',
            type: 'series',
            time: new Date(),
            user: "sadique galaria",
        })
        .then(data => {
          //success callback
          console.log("data ", data);
        })
        .catch(error => {
          //error callback
          console.log("error ", error);
        });
        setModalIsOpen(false)
        window.location.reload();
    }

    return (
        <div style={{height: 40, display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 'bold', padding: 20}}>
            what.to.watch
            <Modal
                isOpen={modalIsOpen}
                style={modalStyle}
                onRequestClose={() => setModalIsOpen(true)}
                contentLabel="Example Modal"
            >
                <Column>
                    <h2>Add your suggestion</h2>
                    <Input placeholder="Series/Movie Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    <Input placeholder="Tags seperated by comma Eg: Horror, Adventure" value={tags} onChange={(e) => setTags(e.target.value)}/>
                    <Select value={streamingOn} onChange={(e) => setStreamingOn(e.target.value)}>
                        <option>
                            Netflix
                        </option>
                        <option>
                            Amazon
                        </option>
                    </Select>
                    <Button style={{height: 40, marginTop: 20}} onClick={addSuggestion}>Submit</Button>
                </Column>
              
            </Modal>
            <Button onClick={() => setModalIsOpen(true)}>Add Show</Button>
        </div>
    )
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth
})(Header);
