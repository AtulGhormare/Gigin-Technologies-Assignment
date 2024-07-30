// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const petsApi = createApi({
  reducerPath: "petsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getPets: builder.query({
      query: () => `pets`,
    }),
    getPetsById: builder.query({
      query: (id) => `pets?id=${id}`,
    }),
    getPetsBySearch: builder.query({
      query: (animal, location, breed) => `pets?animal=${animal}&location=${location}&breed=${breed}`,
    }),
    getPetsBreedByAnimal: builder.query({
      query: (animal) => `breeds?animal=${animal}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPetsQuery, useGetPetsByIdQuery, useGetPetsBreedByAnimalQuery, useGetPetsBySearchQuery } = petsApi;
