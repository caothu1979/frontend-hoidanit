import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableUserManager from './TableUserManager';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            ObjectURL: "",
            isOpen: false,
            id: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            position: "",
            role: "",
            avatar: "",
            action: ""

        }
    }

    async componentDidMount() {
        // let res = await getAllCodeService('GENDER')
        // if (res && res.errCode === 0) {
        //     this.setState({
        //         gender: res.data
        //     })
        // }
        this.props.getGerderStart();
        this.props.FetchPositionStart();
        this.props.FetchRoleStart();

        //console.log("..........",this.props.getGerderStart())
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ""
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositon = this.props.positionRedux;
            this.setState({
                positionArr: arrPositon,
                position: arrPositon && arrPositon.length > 0 ? arrPositon[0].key : ""
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : ""
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                gender: "",
                position: "",
                role: "",
                avatar: "",
                ObjectURL: "",
                action: CRUD_ACTIONS.CREATE
            })
        }
    }
    handlePreviewImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            //console.log("Check file base64:",base64);
            this.setState({
                ObjectURL: URL.createObjectURL(file),
                avatar: base64
            })
        }
    }
    handleOpenImage = () => {
        // console.log("Check open:",this.state.isOpen);
        if (!this.state.ObjectURL) return;
        this.setState({
            isOpen: true
        })

    }
    handleAddNewUser = (event) => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phonenumber: this.state.phoneNumber,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            });
        }
        if (action === CRUD_ACTIONS.EDIT) {

            this.props.FetchEditUserStart({
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phonenumber: this.state.phoneNumber,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
                ObjectURL: this.state.ObjectURL
            });
        }

        // setTimeout(() => {
        //      this.props.FetchAllUserStart()
        // },1000);

        // console.log("Check state before submit:", this.state);
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }
    checkValidateInput = () => {
        let arrCheck = ['email', 'password', 'firstName', 'lastName',
            'phoneNumber', 'address', 'gender', 'position', 'role'];
        let isValid = true;
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert("The input is required " + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }
    handleEditUserParent = (user) => {
        let imageBase64 = "";
        if (user.image) {
            //console.log("Check user image:", user.image);

            //const imageBuffer = Buffer.from(JSON.stringify(user.image)) // This res.data is the whole object, including the type "Buffer" and the data array
            //imageBase64 = `image/png;base64,${imageBuffer.toString('base64')}`
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
            //imageBase64 = user.image
        }
        this.setState({
            id: user.id,
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            ObjectURL: imageBase64,
            action: CRUD_ACTIONS.EDIT
        })
    }
    render() {
        //let gender = this.state.gender;
        let language = this.props.language;
        let isLoading = this.props.isloading;
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        const { email, password, firstName, lastName,
            phoneNumber, address, gender, position, role } = this.state;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Manage Doctor
                </div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>{isLoading === true ? "Loading Gender..." : ""}</div>
                            <div className='col-12'>
                                <FormattedMessage id="manage-user.add-new-user" />:</div>
                            <div className='col-6'>
                                <label>Email:</label>
                                <input type="email" className='form-control'
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} />
                            </div>
                            <div className='col-6'>
                                <label> <FormattedMessage id="manage-user.password" />:</label>
                                <input type="password" className='form-control'
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} />
                            </div>
                            <div className='col-6'>
                                <label> <FormattedMessage id="manage-user.first-name" />:</label>
                                <input type="text" className='form-control'
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-user.last-name" />:</label>
                                <input type="text" className='form-control'
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-user.phone-number" />:</label>
                                <input type="text" className='form-control'
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-user.address" />:</label>
                                <input type="text" className='form-control'
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }} />
                            </div>

                            <div className="form-group col-md-2">
                                <label for="inputCity"><FormattedMessage id="manage-user.gender" />:
                                </label>
                                <select id="inputState" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    value={gender}>
                                    {/**<option selected>Choose Gender</option>*/}
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                            </option>
                                        )
                                    }
                                    )}
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label for="inputState"><FormattedMessage id="manage-user.position" />:</label>
                                <select id="inputState" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                    value={position}>
                                    {/**<option selected>Choose position</option>*/}
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                            </option>
                                        )
                                    }

                                    )}
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label for="inputZip"><FormattedMessage id="manage-user.role-id" />:</label>
                                <select id="inputState" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    value={role}>
                                    {/**<option selected>Choose role</option>*/}
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                            </option>
                                        )
                                    }
                                    )}
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputZip"><FormattedMessage id="manage-user.image" />:</label>
                                <div className='preview-image-container'>
                                    <input id="previewimg" type="file" hidden onChange={(event) => this.handlePreviewImage(event)} />
                                    <label className='label-upload' htmlFor='previewimg'><i className="fas fa-upload"></i>Tải ảnh </label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.ObjectURL})` }}
                                        onClick={() => this.handleOpenImage()}
                                    ></div>
                                </div>

                            </div>
                            <div className='col-12 mt-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary text-center'}
                                    onClick={(event) => this.handleAddNewUser(event)}>
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                        <FormattedMessage id="manage-user.add-new" />}

                                </button>
                            </div>
                            <TableUserManager
                                handleEditUserParentKey={this.handleEditUserParent}
                                action={this.state.action}
                            />
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && <Lightbox
                    mainSrc={this.state.ObjectURL}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                />
                }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        //processLogout: () => dispatch(actions.processLogout()),
        //changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        language: state.app.language,
        genderRedux: state.admin.genders,
        isloading: state.admin.isLoadingGender,
        positionRedux: state.admin.position,
        roleRedux: state.admin.role,
        listUsers: state.admin.users


    };
};
const mapDispatchToProps = dispatch => {
    return {
        getGerderStart: () => dispatch(actions.FetchGenderStart()),
        FetchPositionStart: () => dispatch(actions.FetchPositionStart()),
        FetchRoleStart: () => dispatch(actions.FetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        FetchAllUserStart: () => dispatch(actions.FetchAllUserStart()),
        FetchEditUserStart: (data) => dispatch(actions.FetchEditUserStart(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
