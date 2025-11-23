import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from "react-slick";

class MedicalFacilities extends Component {

    render() {
        return (
            <>
               <div className='section-share section-medical-facilities'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>Cơ sở y tế nổi bật</span>
                            <button className='btn-section'>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facilities'></div>
                                    <div>Hệ thống Thu Cúc 1</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facilities'></div>
                                    <div>Hệ thống Thu Cúc2</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facilities'></div>
                                    <div>Hệ thống Thu Cúc 3</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facilities'></div>
                                    <div>Cơ xương khớp 4</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facilities'></div>
                                    <div>Hệ thống Thu Cúc5</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facilities'></div>
                                    <div>Hệ thống Thu Cúc 6</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facilities'></div>
                                    <div>Hệ thống Thu Cúc 7</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facilities'></div>
                                    <div>Hệ thống Thu Cúc 8</div>
                                </div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacilities);
