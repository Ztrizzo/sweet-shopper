import React, { Component } from "react";
import { connect } from "react-redux";
import OrderHistory from "../OrderHistory/OrderHistory";
import EditForm from "./EditForm";

class AccountPage extends Component{
  constructor(){
    super();
    this.state = {
      updateView: false,
      editModalOpen: false
    }

    this.doneUpdating = this.doneUpdating.bind(this);
  }

  doneUpdating(){
    this.setState({
      updateView: false
    })
  }

  render(){
    const { username, firstName, lastName, email } = this.props.auth;
    const { updateView } = this.state
    return(
      <div>
        <div>
          {updateView ? <EditForm doneUpdating={this.doneUpdating} open={updateView}/>  :
            <div>
              <h3>Account Details</h3>
              <div>Username: {username}</div>
              <div>Email: {email}</div>
              <div>First Name: {firstName}</div>
              <div>Last Name: {lastName}</div>
              <button onClick={() => this.setState({updateView: true})}>Edit Info</button>
            </div>
            }
        </div>
        
        <OrderHistory/>
      </div>
    )
  }
}

export default connect(state => state)(AccountPage);