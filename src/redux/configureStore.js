import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import covidSlice from './covidApi/covidSlice';

const store = configureStore({
  reducer: { covidData: covidSlice },
  middleware: [thunk, logger],
});

export default store;
