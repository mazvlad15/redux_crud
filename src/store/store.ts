import { configureStore } from "@reduxjs/toolkit";
import userSlicer from './Slicer/userSlicer';

export const store = configureStore({
    reducer: {
        users: userSlicer,
        showModal: userSlicer,
    },
  });


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;