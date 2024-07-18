import { AddTrashBin, UserLoggedData, UserLoginData, UserSigupData } from '@core/interface'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseCustomQuery } from './interceptorSlice';

// Define a service using a base URL and expected endpoints
export const nearByTrashBinAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: baseCustomQuery,
    endpoints: (builder) => ({
        addTrashBin: builder.mutation<void, AddTrashBin>({
            query: (data) => ({
                url: `TrashBin/add`,
                body: data,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
        findTrashBin: builder.mutation<void, UserSigupData>({
            query: (data) => ({
                url: `TrashBin/search`,
                body: data,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),

    }),
});

export const { useAddTrashBinMutation, useFindTrashBinMutation } = nearByTrashBinAPI;