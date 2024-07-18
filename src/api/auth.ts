import { UserLoggedData, UserLoginData, UserSigupData } from '@core/interface'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseCustomQuery } from './interceptorSlice';

// Define a service using a base URL and expected endpoints
export const nearByTrashBinAuthAPI = createApi({
  reducerPath: 'loginAPI',
  baseQuery: baseCustomQuery,
  endpoints: (builder) => ({
    userLogin: builder.mutation<UserLoggedData, UserLoginData>({
      query: (data) => ({
        url:`User/login`,
        body: data,
        method: "POST"
    }),
    }),
    userSignup: builder.mutation<void, UserSigupData>({
      query: (data) => ({
        url:`User/signup`,
        body: data,
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
    }),
    }),

  }),
});

export const { useUserLoginMutation, useUserSignupMutation } = nearByTrashBinAuthAPI;
