import { apiSlice } from "../apiSlice"

export const extendedApiSlice = apiSlice.injectEndpoints({
    // endpoints: builder => ({
    //     register: builder.mutation({
    //         query: () => 'user/register'
    //     })
    // })
})

export const { useRegisterMutation } = extendedApiSlice

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()