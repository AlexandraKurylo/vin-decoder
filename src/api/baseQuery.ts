import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { delayFn } from "../helpers/delayFn";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://vpic.nhtsa.dot.gov/api/",
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
