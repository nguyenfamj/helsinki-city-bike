import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';

// Import API for middleware configuration
import { journeysAPI } from '../components/features/journeys/journeysAPI';
import { stationsAPI } from '../components/features/stations/stationsAPI';
import { singleStationAPI } from '../components/features/singlestation/singleStationAPI';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(journeysAPI.middleware)
      .concat(stationsAPI.middleware)
      .concat(singleStationAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
