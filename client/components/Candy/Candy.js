import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@mui/material/Button";

import { addToCart } from "../../store/cart";
import { toggleCart } from "../../store/displayCart";
import { getCandy } from "../../store/candy";
import QtyController from "../QtyController";

import "./Candy.scss";

class Candy extends Component {
  state = {
    qty: 1,
    candy: {},
  };

  async componentDidMount() {
    const { match, getCandy } = this.props;

    if (!this.props.candies.length) {
      await getCandy();
    }

    this.setState({
      candy: this.props.candies.find((candy) => candy.id === +match.params.id) || {},
    });
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    if (!isNaN(value) && value.length <= 4) {
      this.setState({ qty: value });
    }
  };

  handleClick = (amount) => {
    const qty = this.state.qty + amount;
    if (qty > 0) {
      this.setState((prev) => ({ qty: prev.qty + amount }));
    }
  };

  addToCart = () => {
    const { qty, candy } = this.state;
    const { auth, guestCart, addToCart } = this.props;
    addToCart(candy, qty, auth, guestCart);
  };

  render() {
    const { qty, candy } = this.state;

    return (
      <div className="candy-body">
        <div className="candy-img">
          <img src="https://www.rebeccas.com/mm5/graphics/00000001/cn134.jpg" />
        </div>
        <div className="candy-details">
          <h2>
            {candy.name}
            <span className="candy-weight">({candy.weight})</span>
          </h2>
          <div className="candy-price">${candy.price}</div>
          <div className="add-to-cart">
            <QtyController
              buttonHandler={this.handleClick}
              inputHandler={this.handleInputChange}
              blurHandler={() => {}}
              value={qty}
            />
            <Button variant="contained" onClick={this.addToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (candy, qty, auth, guestCart) => dispatch(addToCart(candy, qty, auth, guestCart)),
    toggleCartDisplay: () => dispatch(toggleCart()),
    getCandy: () => dispatch(getCandy()),
  };
};

export default connect((state) => state, mapDispatchToProps)(Candy);
