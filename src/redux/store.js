import { usersApi } from "@/features/users/usersApi";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        getDefaultMiddleware().concat(usersApi.middleware)
    }
})