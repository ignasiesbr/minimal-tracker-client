import React from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {deleteAlert} from '../../actions/alert';

const Alert = ({alerts, deleteAlert}) => {
    return (
        alerts!== null && alerts.length > 0 && alerts.map(alert => (
            <div onClick={() => deleteAlert(alert.id)} key={alert.id} className={`alert alert--${alert.alertType}`}>
                <span className="alert__text">
                    {alert.msg}
                </span>
            </div>
        ))
    );
};
Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
});


export default connect(mapStateToProps, {deleteAlert})(Alert)
