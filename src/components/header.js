import React from 'react';
import { Button, Column, Input, Select, Row, Avatar } from '../styles';
import firebase from "firebase";
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

const modalStyle = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      width: '100%',
      maxWidth: '350px',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
};
function Header(props) {
    const [itemList, setItemList] = React.useState([]);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [result, setSearchResult] = React.useState('');
    const [streamingOn, setStreamingOn] = React.useState('Netflix');

    React.useEffect(() => {
        if(props.authProps) {
            localStorage.setItem("@user", JSON.stringify(props.authProps));
           
        }
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
            }
        });
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const addSuggestion = async () => {
        const res = await Axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=b00e3853&t=${name}`);

        if(res.data) {
            firebase
            .database()
            .ref(`watch-tv/users/${JSON.parse(localStorage.getItem('@user')).uid}/${itemList.length + 1}`)
            .update({
                name: res.data.Title,
                tags,
                streamingOn,
                thumbnail: res.data.Poster ? res.data.Poster : 'https://www.drselectronics.de/wp-content/uploads/2019/11/default-placeholder-1024x1024-960x500.png',
                type: res.data.Type,
                year: res.data.Year,
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
       
       
    }

    return (
        <div style={{height: 40, display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', padding: 20}}>
            <span style={{fontSize: '24px', cursor: 'pointer'}} onClick={() => props.history.push('/')}>what.to.watch</span>
            <Modal
                isOpen={modalIsOpen}
                style={modalStyle}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Example Modal"
            >
                <Column>
                    <h2>Add Show / Movie</h2>
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
            {
                props.location.pathname === '/' ?  
                <Button onClick={() => props.history.push('/my-list')}>Create your list</Button> : 
                <div style={{display: 'flex'}}>
                    <Button onClick={() => setModalIsOpen(true)}>Add Show</Button>
                    <Avatar style={{marginLeft: 20}} src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/10f13510774061.560eadfde5b61.png" alt="netflix" />
                </div>
            }
        </div>
    )
}

export default withRouter(Header);
