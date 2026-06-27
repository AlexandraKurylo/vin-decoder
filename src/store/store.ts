import { configureStore } from "@reduxjs/toolkit";
import { vinApi } from "../api/vin.api.";

export const store = configureStore({
  reducer: {
    [vinApi.reducerPath]: vinApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(vinApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
