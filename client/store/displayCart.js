
const TOGGLE_CART = 'TOGGLE_CART';

export const toggleCart = () => {
  return {
    type: TOGGLE_CART,
  }
}

export default (state = false, action) => {
  if(action.type === TOGGLE_CART){
    return !state;
  }
  return state;
}