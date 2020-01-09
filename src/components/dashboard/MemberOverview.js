import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../layout/Spinner';

const MemberOverview = ({handleClose, id}) => {

    const [data, setData] = useState({
        data:undefined,
        loading:true
    });

    const fetchProfile = () => {
        axios.get(`/api/profile/${id}`).then(
            res => setData({data:res.data}),
            err => console.error(err)
        )
    }

    useEffect(() => {
        fetchProfile();
    }, []);
    
    return (
        data.loading ? <Spinner/> : 
        <div className="member-overview">
            <div className="member-overview__close" onClick={handleClose}>
                X
            </div>
            <div className="member-overview__photo-box">
                <img src={data.data.user.avatar} alt="avatar-user" style={{height:'54px', width:'54px'}}/>
                {data.data.user.name}
            </div>
            <div className="member-overview__info">
                <p className="text">
                    <svg className="member-overview__icon">
                        <use xlinkHref="/sprite.svg#icon-school"></use>
                    </svg>
                    {data.data.role}
                </p>
                <p className="text">
                    <svg className="member-overview__icon">
                        <use xlinkHref="/sprite.svg#icon-public"></use>
                    </svg>
                    {data.data.bio}
                </p>
                <p className="text">
                    <svg className="member-overview__icon">
                        <use xlinkHref="/sprite.svg#icon-message"></use>
                    </svg>
                    {data.data.user.email}
                </p>
            </div>
            <Link className="btn2 btn2-link" to={`/discussion/${id}`}>Chat</Link>
        </div>
    )
}

export default MemberOverview;