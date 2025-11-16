import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentDidMount() {

    }
    toggle = () => {
        this.props.toggleFromParent();

    }
    render() {
        console.log(this.props.isOpen);
        console.log(this.props);
        return (
            <Modal className="modal-user-container" isOpen={this.props.isOpen} toggle={() => { this.toggle() }  }
            size="lg">
                <ModalHeader toggle={() => { this.toggle() }}>Modal title</ModalHeader>
                <ModalBody>
                           <div className='modal-user-body '>
                            <div className='input-container'>
                                <label>Email:</label>
                                <input type="text"/>

                            </div>
                            <div className='input-container'>
                                <label>Password:</label>
                                <input type="password"/>

                            </div>
                             <div className='input-container'>
                                <label>First Name:</label>
                                <input type="text"/>

                            </div>
                            <div className='input-container'>
                                <label>Last Name:</label>
                                <input type="text"/>

                            </div>
                            <div className='input-container max-width-input'>
                                <label>Address:</label>
                                <input type="text"/>

                            </div>
            <div className='input-container'>
            
            <label for="inputState">Gender:</label>
            <select name="gender" class="form-control">
                <option value="1">Male</option>
                <option value="0">Female</option>
            </select>
</div>
        <div className='input-container'>
            <label for="inputZip">Role:</label>
            <select name="roleId" class="form-control">
                <option value="1">Admin</option>
                <option value="2">Doctor</option>
                <option value="3">Patient</option>
                <option value="3">Patient</option>
            </select>
        
                            </div>
                           </div>
                            
                        
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => { this.toggle() }}>
                        Create
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


