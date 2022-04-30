import React, { Component } from "react";

import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import "./NavbarSearch.scss";

export default class extends Component {
  state = {
    searchFocused: false,
    searchText: "",
  };

  handleSearchChange = (event) => {
    this.setState({ searchText: event.target.value });
  };

  toggleSearch = () => {
    this.setState(
      (prev) => ({ searchFocused: !prev.searchFocused }),
      () => {
        if (this.state.searchFocused) {
          this.searchInput.focus();
        }
      }
    );
  };

  handleFocusOut = () => {
    this.setState({ searchFocused: false, searchText: "" });
  };

  render() {
    const { searchText, searchFocused } = this.state;
    const searchWidth = searchFocused ? "160px" : "30px";

    const inputProps = {
      disableUnderline: !searchFocused,
      startAdornment: (
        <InputAdornment
          sx={{
            color: "#000",
          }}
          position="start"
          onClick={this.toggleSearch}
        >
          <SearchIcon fontSize="large" className="navbar-icon" />
        </InputAdornment>
      ),
    };

    const inputStyle = {
      width: searchWidth,
      borderBottom: "none",
      transition: "0.2s ease",
      fontSize: "20px",
    };

    return (
      <TextField
        inputRef={(input) => {
          this.searchInput = input;
        }}
        disabled={!searchFocused}
        value={searchText}
        onChange={this.handleSearchChange}
        onBlur={this.handleFocusOut}
        className="navbar-search"
        InputProps={inputProps}
        variant="standard"
        style={inputStyle}
      />
    );
  }
}
