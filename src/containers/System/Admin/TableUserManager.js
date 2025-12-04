import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
class TableUserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
          usersRedux:[]
     }
  }
  async componentDidMount() {
          this.props.FetchAllUserStart();
   
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
          if( prevProps.listUsers!== this.props.listUsers)
          {
                    this.setState({
                    usersRedux: this.props.listUsers
                    })
          }
  }
 
  render() {
         // console.log("Check all users:",this.props.listUsers);
         let arrUsers = this.state.usersRedux;
   
    return (
      <div className='user-container'>
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
                <th>Role</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
             {(arrUsers && arrUsers.length > 0 && arrUsers.map((item,index) =>{
                    return (
                    <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.gender}</td>                 
                    <td>{item.address}</td>
                    <td>{item.phonenumber}</td>
                    <td>{item.positionId}</td>
                    <td>{item.roleId}</td>
                    <td>
                      <button className='btn-edit' title="Edit"
                      ><i className="fas fa-edit"></i></button>
                      <button className='btn-delete' title="Delete"
                       ><i className="fas fa-trash-alt"></i></button>
                    </td>
                  </tr>
                    )                    
             }))}              
            </table>
          </div>
        </div>
    );
  }

}
const mapStateToProps = state => {
  return {
          listUsers: state.admin.users
  };
};
const mapDispatchToProps = dispatch => {

  return {
          FetchAllUserStart: () => dispatch(actions.FetchAllUserStart())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableUserManage);
