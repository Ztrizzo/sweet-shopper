import axios from 'axios';

const GET_CANDY = 'GET_CANDY'

export const getCandy = () => {
  return async(dispatch) => {
    const candies = (await axios.get('/api/candy')).data;
    
    dispatch({
      type: GET_CANDY,
      candies
    })
  }
  
}


//reducer
export default (state = [], action) => {
  if(action.type === GET_CANDY){
    return action.candies;}
  else
    return state;
}