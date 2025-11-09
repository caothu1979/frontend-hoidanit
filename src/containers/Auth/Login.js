import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
//import * as actions from "../store/actions";
import * as actions from "../../store/actions";
//import { KeyCodeUtils, LanguageUtils } from "../utils";
import "./Login.scss";
//import { FormattedMessage } from 'react-intl';

//import adminService from '../services/adminService';

class Login extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>User Name:</label>
                            <input type='text' className='form-control' placeholder='Enter your username'/>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <input type='password' className='form-control' placeholder='Enter your Password'/>
                        </div>
                        <div className='col-12'>
                        <button className='btn-login'>Login</button>
                        </div>                        
                        <div className='col-12'>
                            <span className='col-12 forgot-password'>Forgot password?</span>
                        </div>
                        <div className='col-12 text-center mt-4'>
                            <span className=''>Or login with</span>
                        </div>
                        <div className='social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
