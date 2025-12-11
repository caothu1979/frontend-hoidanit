import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import './Specialty.scss';
class HomeFooter extends Component {
    render() {
        return (
            <>
                <div className='home-footer text-center'>
                    <p>&copy; 2025 Cao Văn Thu, Visit my website:
                        <a target='_blank' href='https://www.youtube.com/watch?v=147SkAVXEqM&list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI&index=62'>&#8594;Click here&#8592;</a> </p>
                </div>
            </>

        );
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        //language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
