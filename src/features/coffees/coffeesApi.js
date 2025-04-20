import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const coffeesApi = createApi({
  reducerPath: "coffees",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api/v1`,
  }),
  endpoints: (build) => ({
    getCoffees: build.query({
      query: () => "/coffees",
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
    getCoffeeById: build.query({
      query: (id) => `/coffees/${id}`,
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
