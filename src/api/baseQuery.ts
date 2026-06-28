import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { delayFn } from "../helpers/delayFn";
import { API_BASE_URL } from "../constants/global.constants";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
});

export const baseQueryWithDelay: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const [result] = await Promise.all([baseQuery(args, api, extraOptions), delayFn(2000)]);
  return result;
};
