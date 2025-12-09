import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
//import './Specialty.scss';
import Slider from "react-slick";
class OutstandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: [],

        }
    }
    async componentDidMount() {
        this.props.FetchTopDoctorStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux)
        {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
        
    }
    render() {
        //console.log("Check top doctor redux:",this.props.topDoctorsRedux);
        let allDoctors = this.state.arrDoctors; 
        console.log("Check top doctor redux:",allDoctors);
        return (
            <>
                <div className='section-share outstanding-doctor'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>Bác sĩ nổi bật</span>
                            <button className='btn-section'>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                            { allDoctors && allDoctors.length > 0 && allDoctors.map((item,index) => {
                                return (
                                    <div className='section-customize'>
                                    <div className='customize-border'>
                                        <div className='section-bg'>
                                            <div className='bg-image outstanding-doctor'></div>
                                        </div>

                                        <div className='position-doctor text-center'>
                                            <div>Giáo sư, Tiến sĩ, Cao Văn Thu</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                </div>
                                )                                
                            })}                              
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctor,
        language: state.app.language, 
        //language: state.app.language,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        FetchTopDoctorStart: () => dispatch(actions.FetchTopDoctorStart()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
