import React from 'react'
import {useForm} from '../../utils/useForm';
import Axios from 'axios';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';

const ForgotPassword = ({setAlert}) => {

    const [values, handleChange] = useForm({
        email:""
    });
    const onSubmit = async e =>{
        e.preventDefault();
        try {
            const body = JSON.stringify(values);
            const config = {
                headers: {
                    'Content-Type':'application/json'
                }
            };
            const res = await Axios.post('/api/auth/forgot-password', body, config);
            setAlert(res.data, 'success');
        }
        catch(err) {

        }
    }
    return (
        <div className="forgot-password">
            <form className="form2"  onSubmit={e => onSubmit(e)}>
                <label className="form2__label">Write your email</label>
                <input className="form2__input u-margin-bottom-small" type="email" name="email" onChange={handleChange}/>
                <input className="btn2 u-margin-bottom-small" type="submit"/>
            </form>
        </div>
    )
}

export default connect(null, {setAlert})(ForgotPassword);
