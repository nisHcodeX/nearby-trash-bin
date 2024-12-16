import { configureStore } from "@reduxjs/toolkit";
import coreReducer from "@core/coreSlice";
import { nearByTrashBinAPI } from "@api/trashBin";
import { nearByTrashBinAuthAPI } from "@api/auth";


export const store = configureStore({
  reducer: {
    core: coreReducer,
    [nearByTrashBinAuthAPI.reducerPath]: nearByTrashBinAuthAPI.reducer,
    [nearByTrashBinAPI.reducerPath]: nearByTrashBinAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nearByTrashBinAuthAPI.middleware).concat(nearByTrashBinAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

