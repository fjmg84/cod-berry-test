import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Data, Movie } from "types/movies";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Define a service using a base URL and expected endpoints
export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAllMovies: builder.query<Data, void>({
      query: () => `/trending/movie/day?language=en-US'&api_key=${API_KEY}`,
    }),
    getMovieById: builder.query<Movie, string>({
      query: (id) => `/movie/${id}?api_key=${API_KEY}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllMoviesQuery, useGetMovieByIdQuery } = moviesApi;
