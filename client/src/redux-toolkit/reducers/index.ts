import { combineReducers } from '@reduxjs/toolkit';

// Import reducers
import appReducer from '../../components/AppSlice';

export default combineReducers({ app: appReducer });
