import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { completePurchase } from "../../store/cart"
import OrderSummary from "../OrderSummary/OrderSummary";

class Confirmation extends Component{
    constructor(props){
        super(props);
        this.state={
            cart: !this.props? {} : (!window.localStorage.token ? this.props.guestCart : this.props.auth.cart),
            username: !this.props ? '' : (!window.localStorage.token ? '!' : `, ${this.props.auth.username}!`)
        }
    }

    componentDidMount(){
        if(!this.props){
            return;
        }
        this.props.completePurchase(this.props.auth,this.props.guestCart);
    }
    
    render(){
        //TODO: 
        //store cart in order history eventually
        //go back and ensure that if there are no line items (empty cart)
        //you cannot complete purcahse, thus cannot get to this page
        const {cart,username} = this.state;

        if(!cart){
            return;
        }

        const lines = cart.lineitems;

        if(!lines){
            return;
        }

        const total = lines.reduce((prev,curr)=>{
            let price = curr.candy.price * curr.qty * 1;
            return prev + price;
        },0);

        console.log(lines);

        return(
            <div>
                <h1>Thank you for your purchase{ username }</h1>
                <OrderSummary cart = {cart} total = {total}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)  => {
    return{
        completePurchase: (auth,cart)=>{
        dispatch(completePurchase(auth,cart));
      }
    }
  };

export default connect(state=>state, mapDispatchToProps)(Confirmation);
