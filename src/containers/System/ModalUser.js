import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
        //this.state.email = this.state['email']
        this.listenToEmitter();
    }
    componentDidMount() {

    }
    listenToEmitter = () => {
        emitter.on('EVENT CLEAR MODAL DATA', () => {
            //console.log("listen on event emitter:", data);
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            });
        });
    }
    toggle = () => {
        this.props.toggleFromParent();

    }
    handleOnchangeInput = (event, id) => {
        //console.log(event.target.value, id)
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // }, () => { console.log(this.state) })
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter:  " + arrInput[i]);
                break;

            }

        }
        return isValid;
    }
    handleAddNew = () => {
        let check = this.checkValidInput();
        if (check) {
            this.props.createNewUser(this.state);
        }

        this.toggle();
    }

    render() {
        console.log(this.props.isOpen);
        console.log(this.props);
        return (
            <Modal className="modal-user-container" isOpen={this.props.isOpen} toggle={() => { this.toggle() }}
                size="lg">
                <ModalHeader toggle={() => { this.toggle() }}>Modal title</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body '>
                        <div className='input-container'>
                            <label>Email:</label>
                            <input type="text" onChange={(event) => { this.handleOnchangeInput(event, 'email') }}
                                value={this.state.email} />

                        </div>
                        <div className='input-container'>
                            <label>Password:</label>
                            <input type="password" onChange={(event) => { this.handleOnchangeInput(event, 'password') }}
                                value={this.state.password} />

                        </div>
                        <div className='input-container'>
                            <label>First Name:</label>
                            <input type="text" onChange={(event) => { this.handleOnchangeInput(event, 'firstName') }}
                                value={this.state.firstName} />

                        </div>
                        <div className='input-container'>
                            <label>Last Name:</label>
                            <input type="text" onChange={(event) => { this.handleOnchangeInput(event, 'lastName') }}
                                value={this.state.lastName} />

                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address:</label>
                            <input type="text" onChange={(event) => { this.handleOnchangeInput(event, 'address') }}
                                value={this.state.address} />

                        </div>
                        <div className='input-container'>

                            <label for="inputState">Gender:</label>
                            <select name="gender" className="form-control">
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        <div className='input-container'>
                            <label for="inputZip">Role:</label>
                            <select name="roleId" className="form-control">
                                <option value="1">Admin</option>
                                <option value="2">Doctor</option>
                                <option value="3">Patient</option>
                                <option value="3">Patient</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => { this.handleAddNew() }}>
                        Add new
                    </Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


