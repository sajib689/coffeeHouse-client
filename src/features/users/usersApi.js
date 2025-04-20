import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://coffee-house-server-alpha.vercel.app/api/v1`
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
        updateUserRole: build.mutation({
            query: ({_id,role}) => ({
                url: `/users/${_id}/role`,
                method: 'PATCH',
                body: {role},
            })
        }),
        getUserByEmail: build.query({
            query: (email) => `/users/${email}`
        })

    })
})

export const {
    useGetUsersQuery,
    useGetUserByEmailQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useUpdateUserRoleMutation
} = usersApi