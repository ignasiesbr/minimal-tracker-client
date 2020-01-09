import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useForm } from '../../utils/useForm';
import {useParams, withRouter} from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import {connect} from 'react-redux';

const ResetPassword = ({history, setAlert}) => {
    const [values, handleChange] = useForm({
        password: "",
        password2: ""
    });
    const {token} = useParams();
    const [email, setEmail] = useState("");

    const checkToken = async () => {
        const res = await axios.get(`/api/auth/reset/${token}`);
        if (res.data.message === "password reset link a-ok") {
            setEmail(res.data.username);
        }
        else {
            history.push('/forgot')
        }
    }

    useEffect(() => {
        checkToken();
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (values.password !== values.password2) {
                setAlert('passwords must match', 'danger');
            }
            const body = JSON.stringify({password: values.password, email: email});
            const config = {
                headers: {
                    'Content-Type':'application/json'
                }
            };
            console.log(body);
            const res = await axios.put(`/api/auth/updatePasswordViaEmail/${token}`, body, config);
            console.log(res)
            setAlert(res.data.msg, 'success');
        } catch (error) {
            setAlert('Something went wrong', 'danger');
        }

    }

    return (
        <div className="reset-password">
            <h1 className="heading-primary u-margin-bottom-small">Reset your password</h1>
            <form className="form2" onSubmit={e => handleSubmit(e)}>
                <label htmlFor="" className="form2__label">Enter your new password</label>
                <input className="form2__input  u-margin-bottom-small" type="password" placeholder="Enter your new password" name="password" onChange={handleChange}/>
                <label htmlFor="" className="form2__label">Repeat your new password</label>
                <input className="form2__input u-margin-bottom-small" type="password" name="password2" placeholder="Re-enter the password" onChange={handleChange}/>
                <input className="btn2 u-margin-bottom-small" type="submit" />
            </form>
        </div>
    )
}

export default withRouter(connect(null, {setAlert})(ResetPassword));
