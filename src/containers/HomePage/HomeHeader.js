import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeHeader.scss';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions/appActions';


class HomeHeader extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);

    }

    render() {

        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="headerhome.speciality" /></b></div>
                                <div><FormattedMessage id="headerhome.search-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="headerhome.medical-facilities" /></b></div>
                                <div><FormattedMessage id="headerhome.choose-medical" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="headerhome.doctor" /></b></div>
                                <div><FormattedMessage id="headerhome.choose-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="headerhome.health-package" /></b></div>
                                <div><FormattedMessage id="headerhome.general-health" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i class="far fa-question-circle"></i><FormattedMessage id="headerhome.support" /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>NỀN TẢNG Y TẾ</div>
                            <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                            <div className='search'>
                                <i className="fas fa-search"></i><input type="text" placeholder='Search' />
                            </div>

                        </div>
                        <div className='content-down'>
                            <div className='option'>
                                <div className='child-option'>
                                    <div className='icon-child'><i className="fas fa-hospital"></i></div>
                                    <div className='text-child'>Khám chuyên khoa</div>
                                </div>
                                <div className='child-option'>
                                    <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                    <div className='text-child'>Khám
                                        từ xa</div>
                                </div>
                                <div className='child-option'>
                                    <div className='icon-child'><i className="fas fa-bed"></i></div>
                                    <div className='text-child'>Khám tổng quát</div>
                                </div>
                                <div className='child-option'>
                                    <div className='icon-child'><i className="fas fa-vials"></i></div>
                                    <div className='text-child'>Xét nghiệm y học</div>
                                </div>
                                <div className='child-option'>
                                    <div className='icon-child'><i className="fas fa-stethoscope"></i></div>
                                    <div className='text-child'>Khám nha khoa</div>
                                </div>
                                <div className='child-option'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'>Sức khỏe tinh thần</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
