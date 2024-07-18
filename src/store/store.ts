import { configureStore } from "@reduxjs/toolkit";
import coreReducer from "@core/coreSlice";
import { nearByTrashBinAuthAPI } from "@api/auth";


export const store = configureStore({
  reducer: {
    core: coreReducer,
    [nearByTrashBinAuthAPI.reducerPath]: nearByTrashBinAuthAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nearByTrashBinAuthAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

