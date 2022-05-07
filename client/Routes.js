import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm/AuthForm";
import Home from "./components/Home";
import CandyList from "./components/CandyList";
import Candy from "./components/Candy";
import { me } from "./store";
import Cart from "./components/Cart";
import { getGuestCart } from "./store/guestCart";
import { getCandy } from "./store/candy";
import Confirmation from "./components/Confirmation/Confirmation";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AccountPage from "./components/AccountPage/AccountPage";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import OrderHistory from "./components/OrderHistory/OrderHistory";

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    this.props.loadInitialData();
    this.props.getCandy();

    this.props.loadGuestCart();

  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className="routes">
        <Route exact path="/" component={Home} />
        <Route exact path="/candy/:id" component={Candy} />
        <Route exact path="/candy" component={CandyList} />
        <Route exact path="/candy/filter/:filter?/:sort?" component={CandyList} />
        <Route path="/cart" component={Cart} />
        <Route exact path="/confirmation" component={Confirmation} />
        <Route exact path='/admin-panel' component={AdminPanel} />
        <Route exact path='/account' component={AccountPage} />
        <Route exact path='/orderDetails' component={OrderSummary}/>
        <Route exact path='/orderHistory' component={OrderHistory}/>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    loadGuestCart() {
      dispatch(getGuestCart());
    },
    getCandy() {
      dispatch(getCandy())
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
