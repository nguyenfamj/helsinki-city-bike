import { combineReducers } from '@reduxjs/toolkit';

// Import reducers
import appReducer from '../../components/AppSlice';
import { journeysAPI } from '../../components/features/journeys/journeysAPI';
import { stationsAPI } from '../../components/features/stations/stationsAPI';

export default combineReducers({
  app: appReducer,
  [journeysAPI.reducerPath]: journeysAPI.reducer,
  [stationsAPI.reducerPath]: stationsAPI.reducer,
});
