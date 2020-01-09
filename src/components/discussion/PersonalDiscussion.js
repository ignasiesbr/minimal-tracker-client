import React from 'react'
import {useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import {usePost} from '../../utils/usePost';
import {useForm} from '../../utils/useForm';
import axios from 'axios';
import {addNotificationToUser} from '../../actions/notifications';
import chat from '../../assets/images/chat.svg';
import generateMessages from '../../utils/generateMessages';

const PersonalDiscussion = ({addNotificationToUser, user}) => {
    const [value, handleChange] = useForm({
        "text":""
    });

    
    const {id} = useParams();
    const url =  `/api/discussion/${id}`;
    
    const {data, loading} = usePost(url);

    const onSubmit = async e => {
        e.preventDefault();
        const body = JSON.stringify(value);
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };
        let postUrl = `/api/discussion/message/${data._id}`
        const newNotif = {
            text: `${user.name} have sent you a new message`,
            type: 'CHAT',
            discussionWith:user._id
        }
        const sendTo = data.member1 === user._id ? data.member2 : data.member1;
        await addNotificationToUser(sendTo,JSON.stringify(newNotif));
        await axios.post(postUrl, body, config);
        window.location.reload()
    }

    return loading ? <h1>Loading . . .</h1> :  (
        <div className="personal-discussion">
        <img className="personal-discussion__img" src={chat} alt="chat" />
            <h1 className="heading-primary u-margin-bottom-medium">Discussion</h1>
            {data.messages.length === 0 ? "There are no messages" : (
                <ul className="discussion-list">
                    {generateMessages(data.messages)}
                </ul>
            )}
            <form className="form2 personal-discussion__form" onSubmit={e => onSubmit(e)}>
                <textarea className="form2__textarea u-margin-bottom-small" name="text" onChange={handleChange} value={value.text} placeholder="Type here" cols="30" rows="1"></textarea>
                <input className="btn2 u-margin-bottom-medium" type="submit" value="Reply"/>
            </form>
        </div>
    )
}


const mapStateToProps = state => ({
    user: state.auth.user
})
export default connect(mapStateToProps, {addNotificationToUser})(PersonalDiscussion);