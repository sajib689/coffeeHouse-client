import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const coffeesApi = createApi({
  reducerPath: "coffees",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://coffee-house-server-alpha.vercel.app/api/v1`,
  }),
  endpoints: (build) => ({
    getCoffees: build.query({
      query: () => "/coffees",
    }),
    
    getCoffeeById: build.query({
      query: (id) => `/coffees/${id}`,
    }),
    createCoffee: build.mutation({
      query: (coffee) => ({
        url: "/coffees",
        method: "POST",
        body: coffee,
      }),
    }),
    updateCoffee: build.mutation({
      query: ({ id, ...coffee }) => ({
        url: `/coffees/${id}`,
        method: "PUT",
        body: coffee,
      }),
    }),
    deleteCoffee: build.mutation({
      query: (id) => ({
        url: `/coffees/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCoffeesQuery,
  useGetCoffeeByIdQuery,
  useCreateCoffeeMutation,
  useUpdateCoffeeMutation,
  useDeleteCoffeeMutation,
} = coffeesApi;
