import React, { Component, createRef, forwardRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { AdminPanelSettings } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { logout } from "../../store/auth";
import AccountModal from "../AccountModal";

import "./AccountMenu.scss";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
});

class AccountMenu extends Component {
  state = {
    loginModalOpen: false,
    userMenuOpen: false,
    notification: "",
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ userMenuOpen: false });
    }
  };

  toggleLoginModal = () => {
    this.setState((prev) => ({ loginModalOpen: !prev.loginModalOpen }));
  };

  toggleUserMenu = () => {
    this.setState((prev) => ({ userMenuOpen: !prev.userMenuOpen }));
  };

  handleUserIconClick = () => {
    const isLoggedIn = Boolean(this.props.user?.id);
    if (isLoggedIn) {
      this.toggleUserMenu();
    } else {
      this.toggleLoginModal();
    }
  };

  handleLogout = async () => {
    await this.props.handleLogout();
    this.openNotification("You have logged out.");
    this.toggleUserMenu();
  };

  openNotification = (msg) => {
    this.setState({ notification: msg });
  };

  closeNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ notification: "" });
  };

  render() {
    const { userMenuOpen, loginModalOpen, notification } = this.state;
    const { user } = this.props;
    const userMenuClass = `user-menu ${userMenuOpen ? "open" : ""}`;

    return (
      <div className="user-menu-container" ref={this.wrapperRef}>
        <PersonOutlineIcon fontSize="large" className="navbar-icon" onClick={this.handleUserIconClick} />
        <div className={userMenuClass}>
          <div className="user-menu-item">
            <span className="user-menu-username">{user.username?.[0]}</span>
            {user.username}
          </div>
          <Link to="/account" className="user-menu-item" style={{ margin: 0 }}> 
            <AccountCircleIcon className="user-menu-icon"/>
            Profile
          </Link>
          <div className="user-menu-item">
            <SettingsIcon className="user-menu-icon" />
            Settings
          </div>
          {this.props.user.admin ? (
            <Link to="/admin-panel" className="user-menu-item" style={{ margin: 0 }}>
              <AdminPanelSettings className="user-menu-icon" />
              Admin Panel
            </Link>
          ) : null}

          <div className="user-menu-item" onClick={this.handleLogout}>
            <LogoutIcon className="user-menu-icon" />
            Log Out
          </div>
        </div>
        <AccountModal
          toggleLoginModal={this.toggleLoginModal}
          openNotification={this.openNotification}
          modalOpen={loginModalOpen}
        />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(notification)}
          autoHideDuration={6000}
          onClose={this.closeNotification}
        >
          <Alert onClose={this.closeNotification} severity="success" sx={notificationStyle}>
            {notification}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

const notificationStyle = { width: "300px", position: "absolute", top: "60px" };

const mapStateToProps = (state) => ({
  user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu);
