import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import  bookSlice  from './bookings/bookingSlice';
// import graphqlUserSlice from './graphqlUser/graphqlUserSlice';
// import petSlice from './pets/petSlice'
import authSlice from './users/userSlice'
import taskSlice from './dailyTasks/taskSlice'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    // user:graphqlUserSlice,
    // pets:petSlice,
    // bookings:bookSlice,
    tasks:taskSlice,
    auth:authSlice
  },
});
