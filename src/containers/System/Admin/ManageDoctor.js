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
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            oldData: false,
        }
    }
    async componentDidMount() {
        this.props.FetchAllDoctorStart();



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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let selectDoctor = this.buildDataSelect(this.props.allDoctors);
            this.setState({
                listDoctors: selectDoctor
            })
        }
        if (prevProps.language !== this.props.language) {
            let selectDoctor = this.buildDataSelect(this.props.allDoctors);
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
        let { oldData } = this.state;
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
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />

                    </div>
                    <div className='content-rigth form-group'>
                        <label>Thông tin Bác sĩ:</label>
                        <textarea className='form-control' rows={4} cols={40}
                            onChange={(event) => this.handleOnChangeDisc(event)}
                            value={this.state.description}>
                        </textarea>
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
                    {oldData === true ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}</button>
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

        FetchAllDoctorStart: () => dispatch(actions.FetchAllDoctorStart()),
        FetchSaveDetailDoctorStart: (data) => dispatch(actions.FetchSaveDetailDoctorStart(data))

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
