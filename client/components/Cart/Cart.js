import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import CartItem from "../CartItem";

import "./Cart.scss";
import { toggleCart } from "../../store/displayCart";
import { Paper } from "@mui/material";

class Cart extends Component {
  toggleCart = () => {
    this.props.toggleCart();
  };

  render() {
    const cartOpen = this.props.displayCart;
    const items = this.props.auth.cart?.lineitems || this.props.guestCart.lineitems || [];
    const totalPrice =
      items.length > 0 ? items.reduce((total, item) => total + item.candy.price * item.qty, 0) : 0;
    const totalCount = items.length > 0 ? items.reduce((total, item) => total + item.qty, 0) : 0;
    const subtotalMessage = `Subtotal (${totalCount} item${totalCount > 1 ? "s" : ""})`;


    const cart = !window.localStorage.token ? this.props.guestCart : this.props.auth.cart;
    if(!cart){
      return;
    }

    return (
      <div className="navbar-cart">
        {totalCount > 0 && <span className="cart-count-icon">{totalCount}</span>}
        <ShoppingCartOutlinedIcon
          fontSize="large"
          className="navbar-icon shopping-cart"
          onClick={this.toggleCart}
        />
        <Drawer anchor="right" open={cartOpen} onClose={this.toggleCart} transitionDuration={400}>
          <Box sx={{ width: 500, padding: "10px 20px" }} role="presentation">
            <Paper>
              <div className="cart-body">
                <h3>Your Cart</h3>
                <div className="cart-items">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
                <div className="cart-subtotal">
                  <span className="cart-subtotal-label">{subtotalMessage}</span>
                  <span className="cart-subtotal-value">${totalPrice.toFixed(2)}</span>
                </div>
                <Link to="/confirmation">
                  <button disabled={!cart.lineitems || cart.lineitems <=0} className="cart-checkout-button" onClick={this.toggleCart}>
                    Continue to Checkout
                  </button>
                </Link>
              </div>
            </Paper>
          </Box>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
  return {
    toggleCart: function () {
      dispatch(toggleCart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
