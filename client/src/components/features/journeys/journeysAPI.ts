// Import from RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Import API URL
import { baseUrl } from '../../../constants';

// Interfaces
interface journeyRow {
  id: number;
  departure_time: string;
  departure_station_id: number;
  departure_station_name: string;
  return_time: string;
  return_station_id: number;
  return_station_name: string;
  covered_distance: number;
  duration: number;
}

// Get journeys
interface getJourneysResponse {
  success: boolean;
  message: string;
  totalRowCount: string;
  currentPage: string;
  size: string;
  journeys: journeyRow[];
}

export interface getJourneysParams {
  page?: string | number;
  size?: string | number;
  search?: string;
  orderby?: string;
  sort?: string;
}

// Create journeys
interface createJourneyResponse {
  success: true;
  message: string;
  returnedRow: journeyRow;
}

interface createJourneyInput {
  departure_time: Date;
  return_time: Date;
  departure_station_id: number;
  departure_station_name: string;
  return_station_id: number;
  return_station_name: string;
  covered_distance: number;
  duration: number;
}

export const journeysAPI = createApi({
  reducerPath: 'journeysAPI',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ['Journeys'],
  endpoints: (builder) => ({
    getJourneys: builder.query<getJourneysResponse, getJourneysParams>({
      // { page, size, search, orderby, sort }
      query: (queryParams) => ({ url: 'journeys', method: 'GET', params: queryParams }),
      providesTags: ['Journeys'],
    }),
    createJourney: builder.mutation<createJourneyResponse, createJourneyInput>({
      query: (queryBody) => ({ url: 'journeys', method: 'POST', body: queryBody }),
      invalidatesTags: ['Journeys'],
    }),
  }),
});

export const { useGetJourneysQuery, useCreateJourneyMutation } = journeysAPI;
