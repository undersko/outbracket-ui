import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import apiMiddleware from './middlewares/apiMiddleware';
import profileReducer from '@redux-reducers/profile';
import sharedReducers from '@redux-reducers/shared';
import * as Redux from 'redux';

const reducers = {
  ...profileReducer,
  ...sharedReducers,
};

const configureStore = (initialState?: {}) => {
  const middlewares: Redux.Middleware[] = [thunk, apiMiddleware];

  if (process.env.NODE_ENV === `development`) {
    middlewares.push(logger);
  }

  const rootReducer = combineReducers({
    ...reducers,
  });

  const enhancers = [];
  const windowIfDefined = typeof window === 'undefined' ? null : (window as any);
  if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares), ...enhancers));
};

export const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
