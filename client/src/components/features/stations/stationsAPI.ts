// Import from RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Import API URL
import { baseUrl } from '../../../constants';

// Interfaces
export interface stationRow {
  fid: number;
  station_id: number;
  fi_name: string;
  se_name: string;
  en_name: string;
  fi_address: string;
  se_address: string;
  fi_city: string;
  se_city: string;
  operator_name: string;
  capacity: number;
  longitude: string;
  latitude: string;
}

// Get stations
interface getStationsResponse {
  success: boolean;
  message: string;
  totalRowCount: string;
  currentPage: string;
  size: string;
  stations: stationRow[];
}

export interface getStationsParams {
  page?: string | number;
  size?: string | number;
  search?: string;
}

interface createStationResponse {
  success: boolean;
  message: string;
  returnedRow: {
    station_id: number;
    fi_name: string;
    se_name: string;
    en_name: string;
    fi_address: string;
    se_address: string;
    fi_city: string;
    se_city: string;
    operator_name: string;
    capacity: number;
    longitude: string;
    latitude: string;
  };
}

export interface createStationInput {
  station_id: number;
  fi_name: string;
  se_name: string;
  en_name: string;
  fi_address: string;
  se_address: string;
  fi_city: string;
  se_city: string;
  operator_name: string;
  capacity: number;
  longitude: string;
  latitude: string;
}

// Create station

export const stationsAPI = createApi({
  reducerPath: 'stations',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Stations'],
  endpoints: (builder) => ({
    getStations: builder.query<getStationsResponse, getStationsParams>({
      query: (queryParams) => ({ url: 'stations', method: 'GET', params: queryParams }),
      providesTags: ['Stations'],
    }),
    createStation: builder.mutation<createStationResponse, createStationInput>({
      query: (queryBody) => ({ url: 'stations', method: 'POST', body: queryBody }),
      invalidatesTags: ['Stations'],
    }),
  }),
});

export const { useGetStationsQuery, useCreateStationMutation } = stationsAPI;
