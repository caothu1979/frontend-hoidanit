import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt();

// Finish!

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown:'',
            contentHTML:'',
            selectedDoctor:'',
            description:'',
            listDoctors: []

        }
    }
    async componentDidMount() {
        this.props.FetchAllDoctorStart();


    }
    buidDataSelect = (data) => {
    let result = [];
    const {language} = this.props;
    
    if (data && data.length > 0) {
        data.map((item, index)=>{
            let object ={};
            let labelVi = `${item.lastName} ${item.firstName}`;
            let labelEn = `${item.firstName} ${item.lastName}`;
            object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            object.value = item.id;
            result.push(object); 
        }); 
    }
    return result;
  }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
           let selectDoctor = this.buidDataSelect(this.props.allDoctors);
            this.setState({
                listDoctors: selectDoctor
            })
        }
        if(prevProps.language !== this.props.language) {
           let selectDoctor = this.buidDataSelect(this.props.allDoctors);
            this.setState({
                listDoctors: selectDoctor
            }) 
        }
        

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
             contentMarkdown: text,
             contentHTML: html
        })
        console.log('handleEditorChange', html, text);
    }
    handleOnClickDoctor = () => {
        console.log("check state doctor:", this.state);
    }
    handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor}, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };
  handleOnChangeDisc = (event) => {
    this.setState({
        description: event.target.value
    })
  }
  
    render() {
         console.log("Check props redux:", this.props.allDoctors);
        console.log("Check state selected:", this.state.listDoctors);
       
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                This is manage doctor page
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Chọn Bác sĩ:</label>
                      <Select
                        value={this.state.selectedDoctor}
                        onChange={this.handleChange}
                        options={this.state.listDoctors}
                         />
                       
                    </div>
                    <div className='content-rigth form-group'>
                         <label>Thông tin Bác sĩ:</label>
                     <textarea className='form-control' rows={4} cols={40}
                     onChange = {(event) => this.handleOnChangeDisc(event)}
                     value = {this.state.description}>
                    </textarea>
                    </div>
                   
                </div>
                <div className='manage-doctor-editor'>
                <MdEditor style={{ height: '500px' }} 
                renderHTML={text => mdParser.render(text)} 
                onChange={this.handleEditorChange} />
               </div>
               
                <button className='save-content-doctor'
                onClick={() => this.handleOnClickDoctor()}> Lưu thông tin</button>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language

    };
};
const mapDispatchToProps = dispatch => {

    return {
       
         FetchAllDoctorStart: () => dispatch(actions.FetchAllDoctorStart())


    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
