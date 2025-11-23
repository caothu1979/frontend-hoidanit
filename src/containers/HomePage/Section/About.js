import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import './Specialty.scss';

class About extends Component {
    render() {
        return (
             <>
              <div className='section-share section-about'>
                    <div className='section-about-header'>
                    Truyền thông nói về Cao Văn Thu
                    </div> 
                    <div className='section-about-content'>
                              <div className='content-left'>
                                <iframe width="100%" height="400"
                                 src="https://www.youtube.com/embed/qrxcyK2rQ-w?list=RDqrxcyK2rQ-w" 
                                 title="HÃY YÊU NHAU ĐI | TRỊNH CÔNG SƠN | TUYẾT PHƯỢNG | Cha và con (cover)" 
                                 frameborder="0" 
                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                 referrerpolicy="strict-origin-when-cross-origin" 
                                 allowfullscreen></iframe>
                              </div>
                              <div className='content-rigth'>
                              <p>Trong video này, chúng ta sẽ hoàn tất việc design giao diện theo trang bookingcare.vn. Chúng ta sẽ hoàn thiện những phần đang còn dang dở, để từ video tiếp theo, chúng ta sẽ bắt đầu làm về backend và react để tạo dữ liệu thật cho trang home design này.</p>
 
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
