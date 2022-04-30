import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticate } from "../../store";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import "./AccountModal.scss";

class AccountModal extends Component {
  state = {
    isLoginForm: true,
    error: false,
    username: "",
    password: "",
  };

  toggleFormType = () => {
    this.setState((prev) => ({
      isLoginForm: !prev.isLoginForm,
      error: false,
      username: "",
      password: "",
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { isLoginForm } = this.state;

    const { handleAuthenticate, toggleLoginModal, openNotification } = this.props;
    const { username, password, firstName, lastName, email } = event.target;
    const response = await handleAuthenticate(
      username.value,
      password.value,
      isLoginForm ? "login" : "signup",
      firstName?.value,
      lastName?.value,
      email?.value
    );
    if (!response.auth.error) {
      toggleLoginModal();
      openNotification("You have logged in.");
      this.setState({ username: "", password: "" });
    } else {
      this.setState({ error: true });
    }
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, error: false });
  };

  handleClose = () => {
    this.props.toggleLoginModal();

    this.setState({
      error: false,
      username: "",
      password: "",
      isLoginForm: true
    });
  };

  render() {
    const { isLoginForm, error, username, password } = this.state;
    const { modalOpen } = this.props;
    const formClass = `login-modal-form ${error ? "error" : ""}`;

    return (
      <Modal open={modalOpen} onClose={this.handleClose}>
        <Box sx={modalStyle}>
          <div className="login-modal-body">
            <h3>Welcome to Sweet Shopper</h3>
            <h4>{isLoginForm ? "Please log in to your account." : "Please enter your details."}</h4>
            {error && (
              <span className="login-error-msg">
                Authentication failed. Please check your username and password.
              </span>
            )}
            <form className={formClass} onSubmit={this.handleSubmit}>
              <input
                name="username"
                value={username}
                type="text"
                placeholder="Username"
                onChange={this.handleInputChange}
              />
              <input
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleInputChange}
              />
              {!isLoginForm ? (
                <input name="firstName" type="text" placeholder="First Name" />
              ) : null}
              {!isLoginForm ? <input name="lastName" type="text" placeholder="Last Name" /> : null}
              {!isLoginForm ? <input name="email" type="text" placeholder="Email" /> : null}
              <button type="submit">{isLoginForm ? "LOG IN" : "SIGN UP"}</button>
            </form>
            {isLoginForm && (
              <div className="check-member">
                Not a member?{" "}
                <span className="signup-link" onClick={this.toggleFormType}>
                  <b>Join us</b>
                </span>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    );
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

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  handleAuthenticate: (username, password, formName, firstName, lastName, email) =>
    dispatch(authenticate(username, password, formName, firstName, lastName, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountModal);
