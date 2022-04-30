import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import candies from './candy';
import orderHistory from './cart';
import guestCart from './guestCart';
import displayCart from './displayCart'

const reducer = combineReducers({ auth, candies, orderHistory, guestCart, displayCart});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
