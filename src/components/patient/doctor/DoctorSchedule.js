import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            availableTime: []

        }
    }
    capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    setArrDate = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                let label = moment(new Date()).add(i, 'days').format('dddd - DD/MM/YY');
                object.label = this.capitalizeFirstLetter(label);
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM/YY');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        this.setState({
            allDays: allDays
        })


    }
    async componentDidMount() {
        const { language } = this.props;
        console.log('Moment VietNam:', moment(new Date()).format('dddd - DD/MM'));
        console.log('Moment English:', moment(new Date()).locale('en').format('ddd - DD/MM'));
        this.setArrDate();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDate(this.props.language);
        }
    }
    handleScheduleDoctor = async (event) => {
        //console.log("this is value select:", event.target.value);

        if (this.props.doctorId && this.props.doctorId !== -1) {
            let doctorId = this.props.doctorId;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
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
                            <span>Lịch Khám</span></i>
                    </div>
                    <div className='time-content'>
                        {availableTime && availableTime.length > 0 ?
                            availableTime.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi :
                                    item.timeTypeData.valueEn;

                                return (
                                    <button key={index} className='btn-time'>
                                        {timeDisplay}
                                    </button>
                                )
                            })
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
