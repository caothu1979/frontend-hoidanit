import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import './Homepage.scss';
import MedicalFacilities from "./Section/MedicalFacilities";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandBook from './Section/HanldBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';


class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        };

        return (
            <>
                <HomeHeader isShowBanner= {true} />
                <div className="home-header-banner"></div>
                <Specialty
                    settings={settings} />
                <MedicalFacilities
                    settings={settings} />
                <OutstandingDoctor
                    settings={settings} />
                <HandBook
                    settings={settings} />
                <About />
                <HomeFooter />
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
