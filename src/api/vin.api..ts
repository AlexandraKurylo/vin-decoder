import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IVinResult, IVinResponse } from "../types/global.types";

export const vinApi = createApi({
  reducerPath: "vinApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://vpic.nhtsa.dot.gov/api/" }),
  tagTypes: ["VIN"],
  endpoints: (builder) => ({
    decodeVin: builder.query<IVinResult[], string>({
      query: (vin) => `vehicles/decodevin/${vin}?format=json`,

      transformResponse: (response: IVinResponse) => response.Results,

      transformErrorResponse: (response: any) => ({
        status: response.status,
        message: response.data?.Message || "An error occurred while decoding.",
      }),

      providesTags: ["VIN"],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useLazyDecodeVinQuery } = vinApi;
