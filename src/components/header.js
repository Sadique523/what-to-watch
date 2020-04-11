import React from 'react';
import { Button, Column, Input, Select, Avatar } from '../styles';
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

function Header({user, location, history}) {
    const [itemList, setItemList] = React.useState([]);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [darkMode, setDarkMode] = React.useState(false);
    const [name, setName] = React.useState('');
    const [tags, setTags] = React.useState('');
    // const [result, setSearchResult] = React.useState('');
    const [streamingOn, setStreamingOn] = React.useState('Netflix');
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if(localStorage.getItem('darkMode')) {
            setDarkMode(JSON.parse(localStorage.getItem('darkMode')))
        }
        if(user) {
            localStorage.setItem("@user", JSON.stringify(user));
            let value = {};
            firebase
            .database()
            .ref(`watch-tv/users/${user.uid}`)
            .once("value", function(snapshot) {
                value = snapshot.val();
                let array = [];
                if (value) {
                Object.keys(value).forEach(item => array.push(value[item]));
                setItemList(array);
                }
            });
        }
      
      }, [user]);

      React.useEffect(() => {
          if(!darkMode) {
            localStorage.setItem('darkMode', false);
            document.body.style.backgroundColor = 'white';
			document.body.style.color = 'black';
			document.body.style.transition = '0.5s background-color';
          }
          else {
            localStorage.setItem('darkMode', true);
            document.body.style.backgroundColor = 'black';
            document.body.style.color = 'white';
            document.body.style.transition = '0.5s background-color';
          }
      }, [darkMode])

    const addSuggestion = async () => {
        const res = await Axios.get(`https://www.omdbapi.com/?i=tt3896198&apikey=b00e3853&t=${name}`);
        if(res.data.Response === 'True') {
            firebase
            .database()
            .ref(`watch-tv/users/${JSON.parse(localStorage.getItem('@user')).uid}/${itemList.length + 1}`)
            .update({
                name: res.data.Title,
                tags,
                streamingOn,
                thumbnail: res.data.Poster !== 'N/A' ? res.data.Poster : 'https://www.drselectronics.de/wp-content/uploads/2019/11/default-placeholder-1024x1024-960x500.png',
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
        else {
            setError('Invalid movie / series name');
        }
    }

    return (
        <div style={{height: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 'bold', padding: 20}}>
            <span style={{fontSize: '24px', cursor: 'pointer'}} onClick={() => history.push('/')}>what2binge</span>
            <Modal
                isOpen={modalIsOpen}
                style={modalStyle}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Example Modal"
            >
                <Column>
                    <h2>Add Show / Movie</h2>
                    <Input placeholder="Series/Movie Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    <span style={{fontSize: 10, color: 'red'}}>{error}</span>
                    <Input placeholder="Tags seperated by comma Eg: Horror, Adventure" value={tags} onChange={(e) => setTags(e.target.value)}/>
                    <Select value={streamingOn} onChange={(e) => setStreamingOn(e.target.value)}>
                        <option>
                            Netflix
                        </option>
                        <option>
                            Amazon Prime
                        </option>
                        <option>
                            Disney+ Hotstar
                        </option>
                        <option>
                           Not sure
                        </option>
                    </Select>
                    <Button style={{height: 40, marginTop: 20}} onClick={addSuggestion}>Submit</Button>
                </Column>
              
            </Modal>
            {
                location.pathname === '/my-list' ?  
                    <div style={{display: 'flex'}}>
                        
                        <Button onClick={() => setModalIsOpen(true)}>Add Show</Button>
                        <Avatar style={{marginLeft: 20}} src="https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png" alt="user-logo" />
                    </div>
               : 
               <div style={{display: 'flex', alignItems: 'center'}}>
                    <label className="switch">
                            <input
                                checked={darkMode}
                                className="toggle-theme"
                                type="checkbox"
                                onClick={() => setDarkMode(!darkMode)}
                            />
                            <span className="slider round" />
                        </label> 
                        <Button style={{marginLeft: 10}} onClick={() => history.push('/my-list')}>Create your list</Button> 

                </div>
               
              
            }
        </div>
    )
}

export default withRouter(Header);