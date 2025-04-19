import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/api/v1`
    }),
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => '/users'
        }),
        createUser: build.mutation({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user
            })
        }),
        updateUser: build.mutation({
            query: ({ id, ...user }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: user
            })
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            })
        }),
        getUserById: build.query({
            query: (id) => `/users/${id}`
        })

    })
})

export const {} = usersApi