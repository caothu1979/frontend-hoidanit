import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUser } from '../../services/userService';
import "./UserManage.scss";
import ModalUser from './ModalUser';
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenUserModal: false
    }
  }
  async componentDidMount() {
    let response = await getAllUser("ALL");
    console.log(response);
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users
      })
    }
  }
  hanleAddNewUser = () => {
      this.setState({
      isOpenUserModal: true
    });
  }
  toggleuserModal = ( ) => {
    this.setState({
      isOpenUserModal: !this.state.isOpenUserModal
    });
  }
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className='user-container'>
        <ModalUser
          isOpen={this.state.isOpenUserModal}
          toggleFromParent = {this.toggleuserModal} 
          />
        <div className="mx-2">
          <div className='title text-center'>Manage users</div>
          <div className=' ml-2 '>
            <button className="btn btn-primary px-3"
            onClick={()=>this.hanleAddNewUser()}><i className="fas fa-plus"></i>Add new user</button>
          </div>

          <div className='users-table mt-2'>
            <table>
              <tr>
                <th>stt</th>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Phonenumber</th>
                <th>Actions</th>
              </tr>
              {arrUsers && arrUsers.map((item, index) => {

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.gender}</td>
                    <td>{item.address}</td>
                    <td>{item.phonenumber}</td>
                    <td>
                      <button className='btn-edit' title="Edit"><i className="fas fa-edit"></i></button>
                      <button className='btn-delete' title="Delete"><i className="fas fa-trash-alt"></i></button>

                    </td>
                  </tr>
                )
              })}
            </table>
          </div>
        </div>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
