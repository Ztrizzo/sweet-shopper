import React from "react";
import { connect } from "react-redux";
import { deleteItem } from './store';
import { Link } from 'react-router-dom';


const Items = ({ items, category, deleteItem }) => {
  const filteredItems = items.filter(item => category === "" || item.categoryName === category);

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteItem(id);
  };

  return (
    <div className="content">
      <div className='item-container'> 
        {filteredItems.map((item) => {
          return (
              <Link to={`/items/${item.id}`} className='item' key={item.id}>
                <img src={item.artwork1} />
                <div>{item.name}</div>
                <div>{item.size} ml</div>
                <div>${item.price}</div>
                <button className='delete-button' onClick={e => handleDelete(e, item.id)}>x</button>
              </Link>
          )
        })}
      </div>
    </div>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (item) => {
      dispatch(deleteItem(item));
    }
  };
};


export default connect(state => state, mapDispatchToProps)(Items);
