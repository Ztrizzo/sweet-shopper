import React, { Component }  from "react";
import ProductList from "./ProductList";
import UserList from "./UserList";

import './AdminPanel.scss'

class AdminPanel extends Component{
  constructor(){
    super();
    this.state = {
      displayUsers: true
    }

    this.displayUsers = this.displayUsers.bind(this);
    this.displayProducts = this.displayProducts.bind(this);
  }
  
  displayUsers(){
    this.setState({
      displayUsers:true
    })
  }

  displayProducts(){
    this.setState({
      displayUsers:false
    })
  }

  render(){
    const { displayUsers } = this.state;

    return(
      <div className="admin-panel">
        <nav className="admin-nav">
          <h3 onClick={this.displayUsers} className={displayUsers ? "selected" : ""}>users</h3>
          <h3 onClick={this.displayProducts} className={displayUsers ? "" : "selected"}>products</h3>
        </nav>
        {displayUsers ? <UserList/> : <ProductList/>}
      </div>
      
    )
  }
}

export default AdminPanel