import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import { postBulkCreateScheduleService } from '../../../services/userService';
import FormattedDate from '../../../components/Formating/FormattedDate';
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from 'react-toastify';
import _ from 'lodash';
import moment from 'moment';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currDate: '',
            rangeTime: [],

        }
    }
    async componentDidMount() {
        this.props.FetchAllDoctorStart();
        this.props.FetchAllScheduleTimeStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let selectDoctor = this.buildDataSelect(this.props.allDoctors);
            this.setState({
                listDoctors: selectDoctor
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item =>
                    ({ ...item, isSelected: false }))     // add propsty         

            }
            this.setState({
                rangeTime: data
            })
        }
        // if (prevProps.language !== this.props.language) {
        //     let selectDoctor = this.buildDataSelect(this.props.allDoctors);
        //     this.setState({
        //         listDoctors: selectDoctor
        //     })
        // }
    }
    buildDataSelect = (data) => {
        let result = [];
        const { language } = this.props;

        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });

    };
    handleChangeDatePicker = (date) => {
        //console.log("Check date picker:", value)
        this.setState({
            currDate: date[0]
        });

    }
    handleBtnTime = (time) => {
        let { rangeTime } = this.state;
        //console.log("check rangTime before:", rangeTime);
        //let data = rangeTime;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })

        }
        //console.log("check rangTime after:", rangeTime);


    }
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currDate } = this.state;
        let result = [];
        console.log("check state save schedule:", rangeTime);
        if (!currDate) {
            toast.error("Invalid date");
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid Doctor");
            return;
        }
        //let formatedDate = moment(currDate).format(dateFormat.SEND_TO_SERVER);
        let formatedDate = new Date(currDate).getTime();
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((item, index) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = item.keyMap;
                    result.push(object);
                })
            } else {
                console.log("invalid time");
                return;
            }

        }
        await postBulkCreateScheduleService({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatedDate
        });
        console.log("Check result schedule:", result);
         toast.success("Success schedule Doctor");
    }
    render() {
        /*{ this.props.isLoggedIn && <Header /> }*/
        const { isLoggedIn } = this.props;
        const { language } = this.props;
        const { rangeTime } = this.state;
        //console.log("Check state manage schedule rangTime:", rangeTime);
        return (

            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.select-doctor' />:</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.select-date' />:</label>
                            <DatePicker
                                onChange={this.handleChangeDatePicker}
                                className="form-control"
                                value={this.state.currDate}
                                minDate={new Date()}

                            />
                        </div>
                        <div className='col-12 pick-time-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? 'btn btn-schedule active' :
                                                'btn btn-schedule'}
                                            key={index}
                                            onClick={() => this.handleBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })}
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}>
                                <FormattedMessage id='manage-schedule.save' /></button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {

        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        FetchAllDoctorStart: () => dispatch(actions.FetchAllDoctorStart()),
        FetchAllScheduleTimeStart: () => dispatch(actions.FetchAllScheduleTimeStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
