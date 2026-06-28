import { configureStore } from "@reduxjs/toolkit";
import { vinApi } from "../api/vin.api";
import { variablesApi } from "../api/variables.api";

export const store = configureStore({
  reducer: {
    [vinApi.reducerPath]: vinApi.reducer,
    [variablesApi.reducerPath]: variablesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(vinApi.middleware).concat(variablesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
