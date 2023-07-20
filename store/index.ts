import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import test from './modules/test';

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    default:
      return combineReducers({ test })(state, action);
  }
};

export default rootReducer;
