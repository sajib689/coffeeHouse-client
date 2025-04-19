'use client'

import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "@/features/users/usersApi";
import { coffeesApi } from "@/features/coffees/coffeesApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [coffeesApi.reducerPath]: coffeesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(coffeesApi.middleware),
});
