import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';
import FormattedDate from '../../../components/Formating/FormattedDate';
import DatePicker from "../../../components/Input/DatePicker";
import { range } from 'lodash';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currDate: new Date(),
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
            this.setState({
                rangeTime: this.props.allScheduleTime
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
    render() {
        /*{ this.props.isLoggedIn && <Header /> }*/
        const { isLoggedIn } = this.props;
        const { language } = this.props;
        const { rangeTime } = this.state;
        console.log("Check state manage schedule:", this.state);
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
                                            className='btn btn-schedule'
                                            key={index}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })}
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'>
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
