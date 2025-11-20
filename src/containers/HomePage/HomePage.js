import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import './Homepage.scss';
import Doctor from './Section/Doctor';

class HomePage extends Component {

    render() {


        return (
            <>
                <HomeHeader />
                <div className="home-header-banner"></div>
                <Specialty />
                 <Specialty />
            </>



        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
