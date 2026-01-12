import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            availableTime: []

        }
    }
    //UpperCase first letter
    capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    getArrDate = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                let ddMm = moment(new Date()).format('DD/MM/YY');
                let today = `Hôm nay - ${ddMm}`; 
                object.label = today; 
                } else {
                let label = moment(new Date()).add(i, 'days').format('dddd - DD/MM/YY');
                object.label = this.capitalizeFirstLetter(label);
                }
                
            }
            else {
                if (i === 0) {
                let ddMm = moment(new Date()).format('DD/MM/YY');
                let today = `Today - ${ddMm}`; 
                object.label = today;}
                else {
                     object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM/YY');
                } 
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    }
    componentDidMount() {

        //console.log('Moment VietNam:', moment(new Date()).format('dddd - DD/MM'));
        // console.log('Moment English:', moment(new Date()).locale('en').format('ddd - DD/MM'));
       console.log("Check props this.props.doctorPerentId", this.props.doctorPerentId);
        const { language } = this.props;
        let allDays = this.getArrDate(language);
        this.setState({
            allDays: allDays
        });
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
           let allDaysLanguage = this.getArrDate(this.props.language);
           this.setState({
            allDays: allDaysLanguage
           })
        }
         console.log('check state currentDoctorId:', this.props.currentDoctorId);
        if(this.props.doctorParentId !== prevProps.doctorParentId) {
            let allDays = this.getArrDate(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorParentId, allDays[0].value);
            console.log("Check available time:", this.props.doctorParentId);
            this.setState({
                availableTime: res.data ? res.data : []
            })
        }
    }
    handleScheduleDoctor = async (event) => {
        //console.log("this is value select:", event.target.value);

        if (this.props.doctorParentId && this.props.doctorParentId !== -1) {
            let doctorParentId = this.props.doctorParentId;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorParentId, date);
            //console.log("doctor schedule:", res);
            if (res && res.errCode === 0) {
                this.setState({
                    availableTime: res.data ? res.data : []
                })
            }
        }
    }
    render() {
        let { allDays, availableTime } = this.state;
        let { language } = this.props;
        console.log("Time available:", availableTime);

        return (

            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleScheduleDoctor(event)}>
                        {allDays && allDays.length > 0 && allDays.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <i className="fas fa-calendar-alt">
                            <span><FormattedMessage id="patient.detail_doctor.Schedule"/></span></i>
                    </div>
                    <div className='time-content'>
                        
                        {availableTime && availableTime.length > 0 ?
                        <>
                        <div className='time-content-btns'>
                           { availableTime.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi :
                                    item.timeTypeData.valueEn;

                                return (
                                    <button key={index} 
                                    className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}>
                                        {timeDisplay}
                                    </button>
                                )
                            }) }
                            </div>
                            <div className='book-free'>
                                <span> Chọn <i class="fas fa-hand-point-up"></i> và đặt (miễn phí)</span>

                            </div>
                            </>
                            : <span>Không có thời gian khám</span>}
                            </div>
                    </div>
                </div>
            
        );
    }
}



const mapStateToProps = state => {
    return {
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
