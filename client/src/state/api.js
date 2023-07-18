import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: [
        "User",
        "Products",
        "Customers",
        "Transactions",
        "Geography",
        "Sales",
        "Admins",
        "Performance",
        "Dashboard"
    ],

    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTag: ["User"],
        }),
        getProducts: build.query({
            query: () => "client/products",
            providesTag: ["Products"],
        }),
        getCustomers: build.query({
            query: () => "client/customers",
            providesTag: ["Customers"],
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search }
            }),
            providesTag: ["Transactions"],
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providesTag: ["Georgraphy"],
        }),
        getSales: build.query({
            query: () => "Sales/sales",
            providesTag: ["Sales"],
        }),
        getAdmins: build.query({
            query: () => "management/admins",
            providesTag: ["Admins"],
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTag: ["Performance"],
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTag: ["Dashboard"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery
} = api;