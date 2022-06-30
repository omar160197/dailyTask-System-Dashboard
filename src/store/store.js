import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./users/userSlice";
import taskSlice from "./dailyTasks/taskSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    tasks: taskSlice,
    auth: authSlice,
  },
});
