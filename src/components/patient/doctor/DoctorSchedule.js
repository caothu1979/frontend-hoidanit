import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import {getScheduleDoctorByDate} from '../../../services/userService';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays:[]
           
        }
    }
    setArrDate = (language) => {
         let allDays =[];
        for (let i=0; i<7; i++) {
           let object = {};
           if (language === LANGUAGES.VI) {
             object.label = moment(new Date()).add(i,'days').format('dddd - DD/MM/YY');
           }
          else {
             object.label = moment(new Date()).add(i,'days').locale('en').format('dddd - DD/MM/YY');
          }
           object.value = moment(new Date()).add(i,'days').startOf('day').valueOf();
            allDays.push(object);
        }
        this.setState({
            allDays:allDays
        })
       

    }
    async componentDidMount() {
        const {language} = this.props;
        console.log('Moment VietNam:',moment(new Date()).format('dddd - DD/MM'));
        console.log('Moment English:',moment(new Date()).locale('en').format('ddd - DD/MM'));
       this.setArrDate();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDate(this.props.language);
        }
    }
    handleScheduleDoctor = async(event) => {
        console.log("this is value select:",event.target.value);
        
        if (this.props.doctorId && this.props.doctorId !== -1)
        {
            let doctorId = this.props.doctorId;
            let date = event.target.value;             
        let res = await getScheduleDoctorByDate(doctorId,date);
        console.log("doctor schedule:",res);
        }
        
    }


    render() {
        let {allDays} = this.state;
        console.log("all days:",allDays);
        return (
            
               <div className='doctor-schedule-container'>
                <div className='all-shedule'>
                <select onChange={(event) => this.handleScheduleDoctor(event)}>
                    {allDays && allDays.length > 0 && allDays.map((item,index) =>{
                        return(
                             <option key={index} value={item.value}>
                                {item.label}
                             </option>
                        )
                    })}                 
                   
                </select>
                </div>
                <div className='all-available'>

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
