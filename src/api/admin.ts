import { FeedbackRes, TrashBinRes, UpdateTrashBin, UserDetail } from '@core/interface'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseCustomQuery } from './interceptorSlice';

// Define a service using a base URL and expected endpoints
export const nearByTrashBinAdminAPI = createApi({
    reducerPath: 'trashBinAPI',
    baseQuery: baseCustomQuery,
    endpoints: (builder) => ({
        userList: builder.mutation<UserDetail[], void>({
            query: () => ({
                url: `Admin/users`,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
        trashBinList: builder.mutation<TrashBinRes[], void>({
            query: () => ({
                url: `Admin/bins`,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
        feedbackList: builder.mutation<FeedbackRes[], void>({
            query: () => ({
                url: `Admin/feedbacks`,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
        updatetrashBin: builder.mutation<any, UpdateTrashBin>({
            query: (data) => ({
                url: `Admin/update/bin?id=${data.id}&status=${data.status}`,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
    }),
});

export const { useUserListMutation, useTrashBinListMutation, useUpdatetrashBinMutation, useFeedbackListMutation } = nearByTrashBinAdminAPI;