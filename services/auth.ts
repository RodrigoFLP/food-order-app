import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Category,
  IUser,
  Profile,
  OrderItemState,
  IPaymentLink,
  Address,
  DeliveryArea,
} from "../interfaces";

export interface LoginRequest {
  username: string;
  password: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.16:5000/",
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
    getAddress: builder.query<Address[], void>({
      query: () => ({
        url: "/profile/address",
        method: "GET",
        credentials: "include",
      }),
    }),
    getCategoriesList: builder.query<Category[], void>({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
    }),
    getCategoryProducts: builder.query<Category, number>({
      query: (categoryId) => ({
        url: `categories/${categoryId}`,
        method: "GET",
      }),
    }),
    getDeliveryAreas: builder.query<DeliveryArea[], number>({
      query: (storeId) => ({
        url: `stores/${storeId}/area`,
        method: "GET",
      }),
    }),
    calculateTotal: builder.query<any, OrderItemState[]>({
      query: (order) => ({
        url: "tickets/calculate",
        method: "POST",
        body: {
          orderType: "", //TODO: modify hardcoded properties
          customerAddressId: 1,
          storeId: 1,
          ticketItems: [
            ...order.map((item) => ({
              productId: item.productId,
              portion: item.portion,
              quantity: item.quantity,
              tagsGroups: item.tagsGroups,
            })),
          ],
        },
      }),
    }),
    payWithWompi: builder.mutation<IPaymentLink, OrderItemState[]>({
      query: (order) => ({
        url: "tickets",
        method: "POST",
        body: {
          orderType: "", //TODO: modify hardcoded properties
          customerAddressId: 1,
          scheduledDate: "2022-05-22T22:01:26.932Z", //TODO: modify hardcoded properties
          storeId: 1,
          ticketItems: [
            ...order.map((item) => ({
              productId: item.productId,
              portion: item.portion,
              quantity: item.quantity,
              tagsGroups: item.tagsGroups,
            })),
          ],
        },
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
  useGetCategoriesListQuery,
  useGetCategoryProductsQuery,
  useCalculateTotalQuery,
  usePayWithWompiMutation,
  useGetAddressQuery,
  useGetDeliveryAreasQuery,
} = api;
