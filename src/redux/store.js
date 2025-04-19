import { coffeesApi } from "@/features/coffees/coffeesApi";
import { usersApi } from "@/features/users/usersApi";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [coffeesApi.reducerPath]: coffeesApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        getDefaultMiddleware().concat(usersApi.middleware),
        getDefaultMiddleware().concat(coffeesApi.middleware)
    }

})