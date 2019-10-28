import { createStore, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
  userReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;