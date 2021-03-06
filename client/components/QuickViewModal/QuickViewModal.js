import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { addToCart } from "../../store/cart";
import { modalStyle } from "../../utils";

import "./QuickViewModal.scss";

class QuickViewModal extends Component {
  state = {
    modalOpen: false,
  };

  addToCart = async () => {
    const { auth, guestCart, addToCart, candy, toggleModal } = this.props;
    await addToCart(candy, 1, auth, guestCart);
    toggleModal();
  };
  
  render () {
    const { modalOpen, toggleModal } = this.props;
    const { name, weight, price, imageUrl } = this.props.candy;

    return (
      <>
        <Modal open={modalOpen} onClose={toggleModal}>
          <Box sx={modalStyle}>
            <div className="candy-modal-container">
              <div className="modal-left">
                <img src={imageUrl} />
              </div>
              <div className="modal-right">
                <div className="item-name">{name} ({weight})</div>
                <div className="item-details">
                  <div>${price}</div>
                </div>
                <Button variant="contained" onClick={this.addToCart}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (candy, qty, auth, guestCart) => dispatch(addToCart(candy, qty, auth, guestCart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickViewModal);
