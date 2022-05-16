import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, Profile } from "../interfaces";

export interface LoginRequest {
  username: string;
  password: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.12:5000/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<IUser, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        credentials: "include",
        body: credentials,
      }),
    }),
    check: builder.mutation<IUser, void>({
      query: () => ({
        url: "auth/check",
        method: "GET",
        credentials: "include",
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "GET",
        credentials: "include",
      }),
    }),
    getProfile: builder.mutation<Profile, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
        credentials: "include",
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

export const {
  useLoginMutation,
  useProtectedMutation,
  useCheckMutation,
  useGetProfileMutation,
  useLogoutMutation,
} = api;
