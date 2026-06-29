import { createApi, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseQueryWithDelay } from "../api/baseQuery";
import type { IVinResult, IVinResponse, IApiError } from "../types/global.types";
export const vinApi = createApi({
  reducerPath: "vinApi",
  baseQuery: baseQueryWithDelay,
  tagTypes: ["VIN"],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    decodeVin: builder.query<IVinResult[], string>({
      query: (vin) => `vehicles/decodevin/${vin}?format=json`,

      transformResponse: (response: IVinResponse) => {
        const results = response.Results || [];
        const errorCodeEntry = results.find((item) => item.Variable === "Error Code");
        const isErrorState = errorCodeEntry && errorCodeEntry.Value !== "0";

        if (isErrorState) {
          const errorFields = ["Error Code", "Error Text", "Additional Error Text"];
          return results.filter((item) => errorFields.includes(item.Variable));
        }
        return results.filter((item) => item.Value);
      },

      transformErrorResponse: (error: FetchBaseQueryError): IApiError => ({
        status: error.status,
        message: (error.data as { Message?: string })?.Message || "An error occurred while decoding.",
      }),

      providesTags: ["VIN"],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useLazyDecodeVinQuery, useDecodeVinQuery } = vinApi;
