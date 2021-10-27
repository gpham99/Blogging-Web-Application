import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentUserProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'

const Dashboard = ({
    getCurrentUserProfile,
    auth: { user }, 
    profile: {
        profile,
        loading 
    }}) => {
    useEffect (
        () => {
            getCurrentUserProfile()
        }, [getCurrentUserProfile]
    )

    return loading && profile === null ? <Spinner></Spinner> : <Fragment>
        <h1>Dashboard</h1>
        <p> Welcome { user && user.name } !</p>
    
    {/* { profile !== null ? <Fragment>has</Fragment> : <Fragment>has not</Fragment> } */}

    </Fragment>
    // <div>Dashboard</div>
}

Dashboard.propTypes = {
    getCurrentUserProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentUserProfile })(Dashboard)