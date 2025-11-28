import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { getAllCodeService } from "../../../services/userService";
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: [],

        }
    }

    async componentDidMount() {
        let res = await getAllCodeService('GENDER')
        if (res && res.errCode === 0) {
            this.setState({
                gender: res.data
            })
        }
    }
    render() {
        let gender = this.state.gender;
        let language = this.props.language;
        console.log("check language:", language);

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Manage Doctor
                </div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <FormattedMessage id="manage-user.add-new-user" />:</div>
                            <div className='col-6'>
                                <label>Email:</label>
                                <input type="email" className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label> <FormattedMessage id="manage-user.password" />:</label>
                                <input type="password" className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label> <FormattedMessage id="manage-user.first-name" />:</label>
                                <input type="text" className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-user.last-name" />:</label>
                                <input type="text" className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-user.phone-number" />:</label>
                                <input type="text" className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-user.address" />:</label>
                                <input type="text" className='form-control' />
                            </div>

                            <div className="form-group col-md-2">
                                <label for="inputCity"><FormattedMessage id="manage-user.gender" />:
                                </label>
                                <select id="inputState" className="form-control">
                                    {gender && gender.length > 0 && gender.map((item, index) => {
                                        return (
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label for="inputState"><FormattedMessage id="manage-user.position" />:</label>
                                <select id="inputState" className="form-control">
                                    <option selected>Choose position</option>
                                    <option value={1}>Doctor</option>
                                    <option value={2}>Patient</option>
                                    <option value={3}>Other</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label for="inputZip"><FormattedMessage id="manage-user.role-id" />:</label>
                                <select id="inputState" className="form-control">
                                    <option selected>Choose role</option>
                                    <option value={1}>Doctor</option>
                                    <option value={2}>Patient</option>
                                    <option value={3}>Other</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputZip"><FormattedMessage id="manage-user.image" />:</label>
                                <input type="text" className='form-control' />
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary text-center'><FormattedMessage id="manage-user.add-new" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        //processLogout: () => dispatch(actions.processLogout()),
        //changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        language: state.app.language,

    };
};
const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
