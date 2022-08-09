// Import from RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Import API URL
import { baseUrl } from '../../../constants';

// Import interface
import { stationRow } from '../stations/stationsAPI';

// Interfaces
type topPlaceFromStation = {
  return_station_name: string;
  return_station_id: number;
  counted: string;
};

type topPlaceToStation = {
  departure_station_name: string;
  departure_station_id: number;
  counted: string;
};

interface getSingleStationResponse {
  success: boolean;
  message: string;
  stationData: stationRow[];
  journeysFromStation: string;
  journeysToStation: string;
  avgDistanceFromStation: number;
  avgDistanceToStation: number;
  topPlacesFromStation: topPlaceFromStation[];
  topPlacesToStation: topPlaceToStation[];
}

interface getSingleStationParams {
  station_id: string | undefined;
}

export const singleStationAPI = createApi({
  reducerPath: 'singleStation',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getSingleStation: builder.query<getSingleStationResponse, getSingleStationParams>({
      query: ({ station_id }) => ({ url: `stations/${station_id}`, method: 'GET' }),
    }),
  }),
});

export const { useGetSingleStationQuery } = singleStationAPI;
