import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';

const AlertWarning = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <Grid item key={alert.id}>
            <Alert severity={alert.alertType}>
            { alert.msg }
            </Alert>
        </Grid>
    ))

AlertWarning.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(AlertWarning)