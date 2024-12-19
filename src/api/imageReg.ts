import { FeedbackRes, InferenceResult, TrashBinRes, UpdateTrashBin, UserDetail } from '@core/interface'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseCustomQuery } from './interceptorSliceYolo';

// Define a service using a base URL and expected endpoints
export const nearByTrashBinAdminAPI = createApi({
    reducerPath: 'trashBinAPI',
    baseQuery: baseCustomQuery,
    endpoints: (builder) => ({
        imagRecognition: builder.mutation<InferenceResult, any>({
            query: (data) => ({
                url: `garbage-container-detection-sam7i/1`,
                method: "POST",
                params: {
                    api_key: "Ysh0ndqTxQmP4Y6OGJiB"
                },
                body: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }),
        }),
    }),
});

export const { useImagRecognitionMutation} = nearByTrashBinAdminAPI;