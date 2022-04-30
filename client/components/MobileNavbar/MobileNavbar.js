import React, { Component } from "react";
import { Link } from "react-router-dom";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";

import "./MobileNavbar.scss";

export default class extends Component {
  state = {
    mobileNavOpen: false,
  };

  toggleMobileNav = () => {
    this.setState((prev) => ({ mobileNavOpen: !prev.mobileNavOpen }));
  };

  render() {
    const { mobileNavOpen } = this.state;

    return (
      <span className="navbar-mobile">
        <MenuIcon onClick={this.toggleMobileNav} />
        <Modal
          open={mobileNavOpen}
          onClose={this.toggleMobileNav}
          aria-labelledby="navigation"
          aria-describedby="navigation"
        >
          <Box className="navbar-mobile-box" onClick={this.toggleMobileNav}>
            <Link className="mobile-nav-link" to="/">
              Home
            </Link>
            <Link className="mobile-nav-link" to="/candy">
              Shop
            </Link>
            <Link className="mobile-nav-link" to="/about">
              About
            </Link>
          </Box>
        </Modal>
      </span>
    );
  }
}
