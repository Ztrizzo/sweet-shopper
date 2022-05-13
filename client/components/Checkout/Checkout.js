import React, { Component } from "react";
import { connect } from "react-redux";
//require("dotenv").config()

class Checkout extends Component {
    constructor() {
        super()
    }
    render() {
        const test = () => {
          //console.log('process.env', process.env.REACT_APP_SK)
            fetch("http://localhost:8080/api/checkout/create-checkout-session", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then(res => {
                  if (res.ok) return res.json()
                  return res.json().then(json => Promise.reject(json))
                })
                .then(({ url }) => {
                  window.location = url
                })
                .catch(e => {
                  console.log('res', url)
                  console.error(e.error)
                })
        }
        return (
            <div className="shipping-checkout">
              <button onClick={test}>Checkout</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Checkout)