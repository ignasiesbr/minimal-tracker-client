import React, {useState} from 'react';
import {connect} from 'react-redux';
import avatar1 from '../../assets/svg/boy-1.svg'
import avatar2 from '../../assets/svg/man.svg'
import avatar3 from '../../assets/svg/boy.svg'
import avatar4 from '../../assets/svg/girl-1.svg'
import avatar5 from '../../assets/svg/girl.svg'
import avatar6 from '../../assets/svg/man-1.svg'
import avatar7 from '../../assets/svg/man-2.svg'
import avatar8 from '../../assets/svg/man-3.svg'
import avatar9 from '../../assets/svg/man-4.svg'
import avatar10 from '../../assets/svg/question.svg'
import PropTypes from 'prop-types';
import {updateAvatar} from '../../actions/auth';

const images = [avatar1,avatar2,avatar3,avatar4,avatar5,avatar6,avatar7,avatar8,avatar9];
const UpdateAvatar = ({user, updateAvatar}) => {

    const [open, setOpen] = useState(false);
    const imgElements = <div className="avatars">
        <p className="text u-margin-bottom-small">Select your new avatar</p>
        {images.map((img,i) => 
                    (<img key={`img-${i}`}
                        className="avatar"
                        style={{width:'54px', height:'54px'}} 
                        src={img} alt={`avatar-${i}`} 
                        onClick={e => handleClick(e)}    />))}
        </div>

    const handleClick = e => {
        const src = '/' + e.target.src.split('/').splice(3).join('/');
        updateAvatar(JSON.stringify({avatar:src}));
    }

    return (
        <div className="update-avatar">
            <img className="selected-avatar" onClick={() => setOpen(!open)}src={user.avatar} style={{width:'54px', height:'54px'}} alt='user-avatar' />
            {!open ? "" : imgElements }
        </div>
    )
}
UpdateAvatar.propTypes = {
    user: PropTypes.object.isRequired,
    updateAvatar: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.auth.user
})
export default connect(mapStateToProps, {updateAvatar})(UpdateAvatar);
