import React, { Component } from "react";
import axios from "axios";

import './AdminPanel.scss'

class ProductList extends Component{
  constructor(){
    super();
    this.state = {
      products: []
    }
  }

  async componentDidMount(){
    const products = (await axios.get('/api/candy')).data;
    this.setState({
      products
    })
  }

  render(){
    const { products } = this.state
    return(
      <div className="admin-items">
        <ul className="unordered-list">
          {products.map(product => {
            return <li key={product.id} className="product">{product.name}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default ProductList