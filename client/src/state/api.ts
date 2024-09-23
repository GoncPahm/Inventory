import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
    productId: string;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
}

export interface NewProduct {
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
}

export interface SalesSummary {
    salesSummaryId: string;
    totalValue: number;
    changePercentage?: number;
    date: string;
}

export interface ExpenseSummary {
    expenseSummaryId: string;
    totalExpenses: number;
    date: string;
}

export interface ExpenseByCategory {
    expenseByCategoryId: string;
    category: string;
    amount: number;
    date: string;
}

export interface PurchaseSummary {
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
}

export interface DashboardMetrics {
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategory: ExpenseByCategory[];
    purchaseSummary: PurchaseSummary[];
}

export interface User {
    userId: string;
    name: string;
    email: string;
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
    endpoints: (build) => ({
        getDashboardMetrics: build.query<DashboardMetrics, void>({
            query: () => "/api/dashboard/metrics",
            providesTags: ["DashboardMetrics"],
        }),
        getProducts: build.query<Product[], string | void>({
            query: (search) => ({
                url: "/api/products",
                params: search ? { search } : {},
            }),
            providesTags: ["Products"],
        }),
        createProduct: build.mutation<Product, NewProduct>({
            query: (newProduct) => ({
                url: "/api/products/create",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags: ["Products"],
        }),
        getUsers: build.query<User[], string | void>({
            query: (search) => ({
                url: "/api/users",
                params: search ? { search } : {},
            }),
            providesTags: ["Users"],
        }),
        getExpensesByCategory: build.query<ExpenseByCategory[], void>({
            query: () => "/api/expenses",
            providesTags: ["Expenses"],
        }),
    }),
});

export const { useGetDashboardMetricsQuery, useCreateProductMutation, useGetProductsQuery, useGetUsersQuery, useGetExpensesByCategoryQuery } = api;
