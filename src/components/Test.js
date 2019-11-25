import React,{useState} from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import {addNotificationToUser} from '../actions/notifications';

// ADD notification.
const Test = ({addNotificationToUser}) => {

    const [email, setEmail] = useState("");

    const handleChange = e => {
        setEmail(e.target.value);
    }
    
    const searchByEmail = async email => {
        const body = JSON.stringify({email});
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };        
        try {
            const res = await axios.post('/api/users/email', body, config);
            return res.data._id
        }
        catch(err) {
            console.error("here");
            return null;
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const user_id = await searchByEmail(email);
        console.log(user_id);
        const notif = {
            text: "____ wants to add you to the project ____",
            type:'ACTION'
        }
        const json = JSON.stringify(notif);
        addNotificationToUser(user_id, json);
    }
    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="email" value={email} onChange={e => handleChange(e)}/>
                <button>Search for users</button>
            </form>
        </div>
    )
}

export default connect(null, {addNotificationToUser})(Test)
