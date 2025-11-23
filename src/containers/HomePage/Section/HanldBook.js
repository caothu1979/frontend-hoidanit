import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import './Specialty.scss';
import Slider from "react-slick";
class HandBook extends Component {
    render() {
        return (
             <>
               <div className='section-share hand-book'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>Cẩm nang</span>
                            <button className='btn-section'>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <div className='section-bg'>
                                        <div className='bg-image hand-book'></div>
                                    </div>
                                    
                                    <div className='position-doctor text-center'>
                                    <div>Giáo sư, Tiến sĩ, Cao Văn Thu</div>
                                    <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                     <div className='section-bg'>
                                        <div className='bg-image hand-book'></div>
                                    </div>
                                    
                                    <div className='position-doctor text-center'>
                                    <div>Giáo sư, Tiến sĩ, Cao Văn Thu</div>
                                    <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                     <div className='section-bg'>
                                        <div className='bg-image hand-book'></div>
                                    </div>
                                    
                                    <div className='position-doctor text-center'>
                                    <div>Giáo sư, Tiến sĩ, Cao Văn Thu</div>
                                    <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                     <div className='section-bg'>
                                        <div className='bg-image hand-book'></div>
                                    </div>
                                    
                                    <div className='position-doctor text-center'>
                                    <div>Giáo sư, Tiến sĩ, Cao Văn Thu</div>
                                    <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                     <div className='section-bg'>
                                        <div className='bg-image hand-book'></div>
                                    </div>
                                    
                                    <div className='position-doctor text-center'>
                                    <div>Giáo sư, Tiến sĩ, Cao Văn Thu</div>
                                    <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                     <div className='section-bg'>
                                        <div className='bg-image hand-book'></div>
                                    </div>
                                    
                                    <div className='position-doctor text-center'>
                                    <div>Giáo sư, Tiến sĩ, Cao Văn Thu</div>
                                    <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='section-bg'>
                                        <div className='bg-image hand-book'></div>
                                    </div>
                                    
                                    <div className='position-doctor text-center'>
                                    <div>Giáo sư, Tiến sĩ, Cao Văn Thu</div>
                                    <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                     <div className='section-bg'>
                                        <div className='bg-image hand-book'></div>
                                    </div>
                                    
                                    <div className='position-doctor text-center'>
                                    <div>Giáo sư, Tiến sĩ, Cao Văn Thu</div>
                                    <div>Cơ xương khớp</div>
                                    </div>
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
        isLoggedIn: state.user.isLoggedIn,
        //language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
