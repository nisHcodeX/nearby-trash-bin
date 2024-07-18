import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
console.log('process.env.REACT_APP_SERVER_PATH', process.env.REACT_APP_SERVER_PATH)
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_PATH,
  // prepareHeaders(headers) {

  //   //headers.set('Authorization', `Bearer ${token}`);
  //   return headers;
  // }
});

export const baseCustomQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  return result;
};
