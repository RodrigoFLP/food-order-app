import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Category,
  IUser,
  Profile,
  OrderItemState,
  IPaymentLink,
  Address,
  DeliveryArea,
  Store,
  SignUpBody,
  Ticket,
  TicketMutation,
  Product,
  SearchQuery,
  SearchResponse,
  TicketCalculation,
  IProduct,
} from "../interfaces";
import { Tag } from "../interfaces/tag";

export interface LoginRequest {
  username: string;
  password: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/`,
    credentials: "include",
  }),
  tagTypes: ["Address", "Error"],
  endpoints: (builder) => ({
    login: builder.mutation<IUser, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        credentials: "include",
        body: credentials,
      }),
    }),
    signUp: builder.mutation<IUser, SignUpBody>({
      query: (data) => ({
        url: "auth/signup",
        method: "POST",
        body: data,
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
    getCustomerOrders: builder.query<Ticket[], void>({
      query: () => ({
        url: "/profile/orders",
        method: "GET",
        credentials: "include",
      }),
    }),
    getCustomerOrder: builder.mutation<Ticket, string>({
      query: (id) => ({
        url: `/profile/orders/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getCustomerProfile: builder.query<Profile, void>({
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
      providesTags: ["Address"],
    }),
    updateAddress: builder.mutation<Address, Address>({
      query: (data) => ({
        url: `/profile/address/${data.id}`,
        method: "PATCH",
        credentials: "include",
        body: { ...data, id: undefined },
      }),
      invalidatesTags: (result, error, arg) =>
        result ? ["Address"] : ["Error"],
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
    getTagProducts: builder.query<Tag, number>({
      query: (tagId) => ({
        url: `tags/${tagId}`,
        method: "GET",
      }),
    }),
    getProductsByCategory: builder.mutation<Category, number>({
      query: (categoryId) => ({
        url: `categories/${categoryId}`,
        method: "GET",
      }),
    }),
    getProductsByTag: builder.mutation<Tag, number>({
      query: (tagId) => ({
        url: `tags/${tagId}`,
        method: "GET",
      }),
    }),
    getProductById: builder.mutation<IProduct, number>({
      query: (productId) => ({
        url: `products/${productId}`,
        method: "GET",
      }),
    }),
    getDeliveryAreas: builder.query<DeliveryArea[], number>({
      query: (storeId) => ({
        url: `stores/${storeId}/area`,
        method: "GET",
      }),
    }),
    getOneStore: builder.query<Store, void>({
      query: () => ({
        url: `stores/1`,
        method: "GET",
      }),
    }),
    getStores: builder.query<Store[], void>({
      query: () => ({
        url: `stores`,
        method: "GET",
      }),
    }),
    getIsOpen: builder.query<{ isOpen: boolean }, void>({
      query: () => ({
        url: `stores/is-open`,
        method: "GET",
      }),
    }),
    calculateTotal: builder.query<TicketCalculation, OrderItemState[]>({
      query: (order) => ({
        url: "tickets/calculate",
        method: "POST",
        body: {
          orderType: "pickup",
          customerAddressId: null,
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
    payWithWompi: builder.mutation<
      IPaymentLink,
      { info: TicketMutation; items: OrderItemState[] }
    >({
      query: (order) => ({
        url: "tickets",
        method: "POST",
        body: {
          orderType: order.info.orderType, //TODO: modify hardcoded properties
          customerAddressId: order.info.customerAddressId || null,
          scheduledDate: order.info.scheduledDate || null, //TODO: modify hardcoded properties
          storeId: order.info.storeId,
          ticketItems: [
            ...order.items.map((item) => ({
              productId: item.productId,
              portion: item.portion,
              quantity: item.quantity,
              tagsGroups: item.tagsGroups,
            })),
          ],
        },
      }),
    }),
    searchProduct: builder.mutation<SearchResponse, SearchQuery>({
      query: (query) => ({
        url: `products/search?keyword=${query.keyword}&take=5&skip=${
          5 * query.skip!
        }`,
        method: "GET",
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useProtectedMutation,
  useCheckMutation,
  useGetProfileMutation,
  useLogoutMutation,
  useGetCategoriesListQuery,
  useGetCategoryProductsQuery,
  useGetProductsByCategoryMutation,
  useCalculateTotalQuery,
  usePayWithWompiMutation,
  useGetAddressQuery,
  useGetDeliveryAreasQuery,
  useGetCustomerProfileQuery,
  useGetStoresQuery,
  useGetIsOpenQuery,
  useGetCustomerOrdersQuery,
  useGetCustomerOrderMutation,
  useUpdateAddressMutation,
  useSearchProductMutation,
  useGetOneStoreQuery,
  useGetProductByIdMutation,
  useGetTagProductsQuery,
} = api;
