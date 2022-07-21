import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface appState {
  notification: { open: boolean; variant: string; severity: string; message: string };
}

const initialState: appState = {
  notification: { open: false, variant: '', severity: '', message: '' },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setNotification: (
      state,
      {
        payload: { variant, severity, message },
      }: PayloadAction<{ variant: string; severity: string; message: string }>
    ) => {
      state.notification = { open: true, variant, severity, message };
    },
    closeNotification: (state) => {
      state.notification = initialState.notification;
    },
  },
});

export const { setNotification, closeNotification } = appSlice.actions;
export default appSlice.reducer;
