import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import QuickViewModal from "../QuickViewModal";

import "./CandyItem.scss";

class CandyItem extends Component {
  state = {
    modalOpen: false,
  };

  toggleModal = (event) => {
    event.preventDefault();
    this.setState((prev) => ({ modalOpen: !prev.modalOpen }));
  };

  render() {
    const { id, name, price } = this.props.candy;
    const { modalOpen } = this.state;

    return (
      <div className="candy-item" key={id}>
        <Link to={`/candy/${id}`}>
          <div
            className="image"
            style={{
              backgroundImage: "url(https://www.rebeccas.com/mm5/graphics/00000001/cn134.jpg)",
              backgroundSize: "cover"
            }}
          >
            <div className="quick-add">
              <div variant="contained" onClick={this.toggleModal}>
                Quick View
              </div>
              <QuickViewModal
                candy={this.props.candy}
                modalOpen={modalOpen}
                toggleModal={this.toggleModal}
              />
            </div>
          </div>
        </Link>
        <div className="details">
          <span>{name}</span>
          <span>${price}</span>
        </div>
      </div>
    );
  }
}

export default connect()(CandyItem);
