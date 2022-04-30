import { Box, Modal } from "@mui/material";
import React, { Component } from "react";
import axios from "axios";

class UserDetails extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      isAdmin: this.props.user.admin
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }


  async doneUpdating(){
    axios.put(`/api/users/${this.props.user.id}`)
    this.props.done()
  }

  handleChange(evt){
    this.setState({
      isAdmin: !this.state.isAdmin
    })
    
  }

  render(){
    const { isAdmin } = this.state;
    const { open, done, user } = this.props;
    return(
      <Modal open={open} >
        <Box sx={modalStyle}>
          <h3>{user.username}</h3>
          <h5>{user.email}</h5>
          <h5>{user.firstName}</h5>
          <h5>{user.lastName}</h5>
          <label><input type="checkbox" checked={isAdmin} onChange={this.handleChange}/>Admin</label>
          
          <button onClick={done}>Back</button>
        </Box>
      </Modal>
    )
  }
}
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  background: "#ffffff",
  transform: "translate(-50%, -50%)",
  minWidth: "40%",
  maxWidth: "80%",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
};
export default UserDetails;