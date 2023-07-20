import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './index';
import { configureStore } from '@reduxjs/toolkit';

const devtoolIsProduction = process.env.NODE_ENV === 'production';

const makeStore = () => {
  const middleware = compose(applyMiddleware(thunk));
  const store = configureStore({
    reducer: rootReducer,
    enhancers: [middleware],
    devTools: !devtoolIsProduction,
  });
  return store;
};

const wrapper = createWrapper(makeStore, {
  debug: !devtoolIsProduction,
});

export default wrapper;
