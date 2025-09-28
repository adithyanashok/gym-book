// store/store.ts
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import membersReducer from "./slices/membersSlice";
import plansReducer from "./slices/plansSlice";
import statisticsReducer from "./slices/statisticsSlice";
import adminReducer from "./slices/adminSlice";
import gymSlice from "./slices/gymSlice";
import notificationsReducer from "./slices/notificationsSlice";

export const store = configureStore({
  reducer: {
    members: membersReducer,
    plans: plansReducer,
    statistics: statisticsReducer,
    admin: adminReducer,
    gym: gymSlice,
    notifications: notificationsReducer,
  },
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
