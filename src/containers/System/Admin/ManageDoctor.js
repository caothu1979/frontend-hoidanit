import React, { act, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt({
    breaks: true
});

// Finish!

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save markdown
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            oldData: false,
            //save doctor infomation
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice:'',
            selectedPayment:'',
            selectedProvince:'',
            nameClinic:'',
            addressClinic:'',
            note:''

        }
    }
    async componentDidMount() {
        this.props.FetchAllDoctorStart();
        this.props.FetchRequiredDoctorInfor();



    }
    buildDataSelect = (data,type) => {
        let result = [];
        const { language } = this.props;

        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi = type =='USER'? `${item.lastName} ${item.firstName}`: item.valueVi;
                let labelEn = type =='USER'? `${item.firstName} ${item.lastName}`: item.valueEn;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let selectDoctor = this.buildDataSelect(this.props.allDoctors);
            this.setState({
                listDoctors: selectDoctor
            })
        }
        if (prevProps.language !== this.props.language) {
            let selectDoctor = this.buildDataSelect(this.props.allDoctors,'USER');
            let {resPayment,resPrice,resProvince} = this.props.allRequiredInfor;
            let dataSelectedPrice = this.buildDataSelect(resPrice);
            let dataSelectedPayment = this.buildDataSelect(resPayment);
            let dataSelectedProvince = this.buildDataSelect(resProvince);
            this.setState({
                listDoctors: selectDoctor,
                listPrice: dataSelectedPrice,
               listPayment: dataSelectedPayment,
               listProvince: dataSelectedProvince
            })
        }
        if(prevProps.allRequiredInfor !== this.props.allRequiredInfor) {
           // console.log("Check prop redux doctor infor:",this.props.allRequiredInfor)
            //let data = this.props.allRequiredInfor;
            let {resPayment,resPrice,resProvince} = this.props.allRequiredInfor;
            let dataSelectedPrice = this.buildDataSelect(resPrice);
            let dataSelectedPayment = this.buildDataSelect(resPayment);
            let dataSelectedProvince = this.buildDataSelect(resProvince);
          // console.log("Check data selected:",dataSelectedPrice);
            this.setState({
               listPrice: dataSelectedPrice,
               listPayment: dataSelectedPayment,
               listProvince: dataSelectedProvince
            });
            // listPrice: [],
            // listPayment: [],
            // listProvice: [],
            }


    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
        console.log('handleEditorChange', html, text);
    }
    handleSaveDetailDoctor = () => {
        let { oldData } = this.state;
        this.props.FetchSaveDetailDoctorStart({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: oldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

        });
        //console.log("check state doctor:", this.state);

    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.data && res.data.markdown) {
            let markdown = res.data.markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                oldData: true
            });
        } else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                oldData: false
            });
        }
    };
    handleOnChangeDisc = (event) => {
        this.setState({
            description: event.target.value
        });
    }

    render() {
        // console.log("Check props redux:", this.props.allDoctors);
        // console.log("Check state selected:", this.state.listDoctors);
         //console.log("Check prop redux doctor infor:",this.state.listPrice);
        let { oldData} = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.title"/>
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.choose-doctor"/>:</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={'Chọn Bác sĩ'}
                        />

                    </div>
                    <div className='content-rigth form-group'>
                        <label><FormattedMessage id="admin.Doctor-Infor"/>:</label>
                        <textarea className='form-control' rows={4} cols={40}
                            onChange={(event) => this.handleOnChangeDisc(event)}
                            value={this.state.description}>
                        </textarea>
                    </div>                           
                </div>
                <div className='more-context-extra row'>
                <div className='col-4 form-group'>
                    <lable>Chọn giá:</lable>
                    <Select
                           // value={this.state.selectedPrice}
                            //onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder={'Chọn giá'}
                        />
                </div>
                <div className='col-4 form-group'>
                    <lable>Chọn phương thức thanh toán:</lable>
                    <Select
                            //value={this.state.selectedPayment}
                           // onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                        />
                </div>
                <div className='col-4 form-group'>
                    <lable>Chọn tỉnh thành:</lable>
                    <Select
                            //value={this.state.selectedProvince}
                            //onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            placeholder={'Chọn tỉnh thành'}
                        />
                </div>
                <div className='col-4 form-group'>
                    <lable>Tên phòng khám:</lable>
                    <input className='form-control'/>
                </div>
                <div className='col-4 form-group'>
                    <lable>Địa chỉ phòng khám:</lable>
                    <input className='form-control'/>
                </div>
                <div className='col-4 form-group'>
                    <lable>Note:</lable>
                    <input className='form-control'/>
                </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>

                <button className={oldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={() => this.handleSaveDetailDoctor()}>
                    {oldData === true ? <span><FormattedMessage id="admin.save-infor"/></span> : <span><FormattedMessage id="admin.create-infor"/></span>}</button>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredInfor: state.admin.allRequiredInfor,

    };
};
const mapDispatchToProps = dispatch => {

    return {

        FetchAllDoctorStart: () => dispatch(actions.FetchAllDoctorStart()),
        FetchSaveDetailDoctorStart: (data) => dispatch(actions.FetchSaveDetailDoctorStart(data)),
        FetchRequiredDoctorInfor: () => dispatch(actions.FetchRequiredDoctorInfor())

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
