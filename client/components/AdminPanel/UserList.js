import React, { Component } from "react";
import axios from 'axios';

import './AdminPanel.scss'
import UserDetails from "./UserDetails";

class UserList extends Component{
  constructor(){
    super();
    this.state = {
      users: [],
      showUserDetails: false,
      selectedUser: {}
    }

    this.displayUserInfo = this.displayUserInfo.bind(this);
    this.closeUserInfo = this.closeUserInfo.bind(this);
  }


  async componentDidMount(){
    const users = (await axios.get('/api/users')).data;
    this.setState({
      users
    })
  }

  displayUserInfo(userId){
    this.setState({
      showUserDetails: true,
      selectedUser: this.state.users.find((user) => user.id === userId)
    })
  }

  closeUserInfo(){
    this.setState({
      showUserDetails: false
    })
  }

  render(){
    const { users, showUserDetails, selectedUser } = this.state
    if(!users)
      return null;

    return(
      <div className="admin-items">
        {showUserDetails ? <UserDetails open={showUserDetails} done={this.closeUserInfo} user={selectedUser}/> :
        <ul className="unordered-list">
            {users.map(user => {
              return <li key={user.id} className="user" onClick={() => this.displayUserInfo(user.id)}>{user.username}</li>
            })}
        </ul> 
  }
      </div>
    )
  }
}

export default UserList