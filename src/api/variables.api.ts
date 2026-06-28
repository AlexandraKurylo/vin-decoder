import { createApi, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseQueryWithDelay } from "../api/baseQuery";
import type { IApiError, IVariable, IVariableResponse } from "../types/global.types";

export const variablesApi = createApi({
  reducerPath: "variablesApi",
  baseQuery: baseQueryWithDelay,
  tagTypes: ["Variables"],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getVariables: builder.query<IVariable[], void>({
      query: () => "vehicles/getvehiclevariablelist?format=json",

      transformResponse: (response: IVariableResponse) => response.Results || [],

      transformErrorResponse: (error: FetchBaseQueryError): IApiError => ({
        status: error.status,
        message: (error.data as any)?.Message || "Failed to load variables.",
      }),

      providesTags: ["Variables"],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetVariablesQuery } = variablesApi;
