
import axios from 'axios';

const GET_PURCHASED = 'GET_PURCHASED';

export const addToCart = (candy, qty, auth, guestCart)=>{

  return async(dispatch)=>{
    qty = parseInt(qty);

    const cart = (!window.localStorage.token && guestCart) ? guestCart : auth.cart;

    let line = (!cart.lineitems) ? null : cart.lineitems.find(_line => {
      return _line.candyId === candy.id;
    });

    //if no line item exist create one to add to cart
    if(!line){
      (await axios.post('/api/lineItem',{cartId:cart.id, qty: qty, candyId: candy.id}, {
        headers: {
          authorization: window.localStorage.token
        }
      })).data; 
    }
    else{
      //else update line item in cart 
      (await axios.put(`/api/lineItem/${line.id}`, {...line, ...{qty: line.qty + qty}},{
        headers: {
          authorization: window.localStorage.token
        }
      }));
    }

    if(!window.localStorage.token && guestCart){
      const updatedcart = (await axios.get(`/api/cart/${cart.id}`, {
        headers:{
          authorization: 'guest'
        }
      })).data ;
      guestCart.lineitems = updatedcart.lineitems;

      dispatch({
        type: "GUEST_CART",
        guestCart
      })
      return dispatch({
        type: "TOGGLE_CART"
      })
    }
    else{
      const updatedcart = (await axios.get('/api/cart/',{headers: {authorization: window.localStorage.token}})).data ;
      auth.cart = updatedcart;

      dispatch({
        type: "SET_AUTH",
        auth
      })
      return dispatch({
        type: "TOGGLE_CART"
      })

    }
  }
};

export const updateItem = (item) => async (dispatch, getState) => {
  const store = getState();
  const { auth, guestCart } = store;
  await axios.put(`/api/lineItem/${item.id}`, item , {
    headers: {
      authorization: window.localStorage.token
    }
  });
  const cart = auth.cart || guestCart;
  const updatedCart = {
    ...cart,
    lineitems: cart.lineitems.map(prev => prev.id === item.id ? item : prev)
  };
  if (auth.cart) {
    dispatch({ type: "SET_AUTH", auth: { ...auth, cart: updatedCart }});
  } else {
    dispatch({ type: "GUEST_CART", guestCart: updatedCart });
  }
};

export const completePurchase = (auth,guestCart)=>{
  return async(dispatch)=>{
      const cart = !window.localStorage.token ? guestCart : auth.cart;

      const total = cart.lineitems.reduce((prev,curr)=>{
        let price = curr.candy.price * curr.qty * 1;
        return prev + price;
      },0).toFixed(2);

      const date = new Date();  
      
      //route for logged in user
      if(auth.cart){
        //use put command to update the user's cart to isPurchased === true
        await axios.put(`/api/cart/${auth.cart.id}`, {...auth.cart, ...{isPurchased: true, date: date, total: total} } );
        
        //create a new cart for the logged in user
        const newCart = (await axios.post('/api/cart/', null, {headers: {authorization: window.localStorage.token}})).data;

        auth.cart = newCart;

        return dispatch({
            type: "SET_AUTH",
            auth
          })
      }
      else{ //logged out user
        //mark guest cart as purchased
        await axios.put(`/api/cart/${guestCart.id}`, {...guestCart, ...{isPurchased: true}});

        //create new guestCart
        const newCart = (await axios.post('/api/cart', null,  {
          headers:{
            authorization: 'guest'
          }
        })).data;

        guestCart = newCart;
        window.localStorage.cartId = newCart.id;

        return dispatch({
          type: "GUEST_CART",
          guestCart
        })
      }
  }
}

export const getPurchased = ()=>{
  return async(dispatch) => {
    const orderHistory = (await axios.get('/api/cart/complete', {
      headers: {
        authorization: window.localStorage.token
      }
    })).data;

    dispatch({
      type: GET_PURCHASED,
      orderHistory
    })
  }
}

//reducer
export default(state = [], action) => {
  if(action.type === GET_PURCHASED){
    return action.orderHistory;
  }

  return state;
}