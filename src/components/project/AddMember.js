import React,{useState} from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import {addNotificationToUser} from '../../actions/notifications';
import PropTypes from 'prop-types'

const AddMember = ({selectedProject, addNotificationToUser, user}) => {
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
            text: `${user.name} wants to add you in the project: ${selectedProject.title}`,
            type:'ADD_TO_PROJECT',
            project: selectedProject._id
        };
        const json = JSON.stringify(notif);
        console.log(json);
        addNotificationToUser(user_id, json);
    }
    return (
        <div>
            <form className="form2" onSubmit={e => handleSubmit(e)}>
                <input className="form2__input u-margin-bottom-small" placeholder="Type the email" type="email" value={email} onChange={e => handleChange(e)}/>
                <button className="btn2 u-center-text">Invite user</button>
            </form>
        </div>
    )
}
AddMember.propTypes = {
    selectedProject: PropTypes.object.isRequired,
    addNotificationToUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
    selectedProject: state.projects.selectedProject,
    user: state.auth.user
})
export default connect(mapStateToProps, {addNotificationToUser})(AddMember)