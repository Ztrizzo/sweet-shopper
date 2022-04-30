import React, { Component } from "react";
import { connect } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";

import { updateItem } from "../../store/cart";
import { deleteFromCart } from "../../store/guestCart";
import QtyController from "../QtyController";

import "./CartItem.scss";

class CartItem extends Component {
  constructor(props) {
    super();

    this.state = {
      qty: props.item.qty,
    };
  }

  handleQtyInputChange = (event) => {
    const { value } = event.target;
    if (!isNaN(value) && value.length <= 4) {
      this.setState({ qty: value });
    }
  };

  handleQtyChange = () => {
    const { item, updateItem } = this.props;
    const qty = parseInt(this.state.qty);
    if (qty != item.qty && qty > 0) {
      updateItem({ ...item, qty });
    } else {
      this.setState({ qty: item.qty });
    }
  };

  handleClick = (amount) => {
    const qty = this.state.qty + amount;
    if (qty > 0) {
      this.setState((prev) => ({ qty: prev.qty + amount }), this.handleQtyChange);
    }
  };

  handleDelete = () => {
    if (!this.props.auth.id) {
      this.props.deleteItem(this.props.item.id);
    } else {
      this.props.deleteItem(this.props.item.id)
    }
  };

  render() {
    const { qty } = this.state;
    const { id, candy } = this.props.item;

    return (
      <div key={id} className="cart-item">
        <div className="cart-item-img">
          <img src="https://www.rebeccas.com/mm5/graphics/00000001/cn134.jpg" />
        </div>
        <div className="cart-item-body">
          <div className="cart-item-title">{candy.name}</div>
          <div className="cart-item-weight">{candy.weight}</div>
          <div className="cart-item-details">
            <span className="cart-item-price">${candy.price}</span>
            <span className="cart-item-quantity">
              <DeleteIcon className="cart-item-icon" onClick={this.handleDelete} />
              <QtyController
                buttonHandler={this.handleClick}
                inputHandler={this.handleQtyInputChange}
                blurHandler={this.handleQtyChange}
                value={qty}
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  updateItem: (item) => dispatch(updateItem(item)),
  deleteItem: (id) => dispatch(deleteFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
