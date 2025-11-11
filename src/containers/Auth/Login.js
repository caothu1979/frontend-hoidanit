import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
//import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import axios from "../../axios";
import { handleLoginApi } from '../../services/userService';
//import { KeyCodeUtils, LanguageUtils } from "../utils";
import "./Login.scss";
//import { FormattedMessage } from 'react-intl';

//import adminService from '../services/adminService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: "" 
        }
        
    }
    handleOnchangeInput = (event) => {
            this.setState({
                username: event.target.value
            })
        }
    handleOnchangePassword = (event) => {
            this.setState({
                password: event.target.value
            }) 
        }
    handleLogin = async() => {
        this.setState({
            errMessage:""
        });
       try {
        let data = await handleLoginApi(this.state.username,this.state.password);
        if(data && data.errCode !== 0){
            this.setState({
            errMessage: data.errMessage})
        }
        if(data && data.errCode === 0){
            userLoginSuccess(data.user);
            alert("You are login success");
        }

        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage:error.response.data.errMessage
                    });

                }
            }

            console.log("fdfdfdf",error.response);
        }
    }
    handleShowHidePassword = () =>{
        this.setState({
            isShowPassword: !this.state.isShowPassword
        });
        
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>User Name:</label>
                            <input type='text' className='form-control' placeholder='Enter your username'
                            value={this.state.username} onChange={(event) => this.handleOnchangeInput(event)}/>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                            <input type={this.state.isShowPassword? 'text': 'password'} className='form-control' placeholder='Enter your Password'
                            value={this.state.password} onChange={(event) => this.handleOnchangePassword(event)}/>
                           <span onClick={() => this.handleShowHidePassword()}>
                            <i className={this.state.isShowPassword? "far fa-eye": "fas fa-eye-slash"}></i>
                           </span>
                            
                            </div>
                        </div>
                        <div className='col-12' style={{color:'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                        <button className='btn-login' onClick={() => this.handleLogin()}>Login</button>
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
        userLoginSuccess: (adminInfo) => dispatch(actions.userLoginSuccess(adminInfo))
    };  
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
