"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "../(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "productId", headerName: "ID", flex: 1, align: "center", headerAlign: "center" },
    { field: "name", headerName: "Product Name", flex: 1, align: "center", headerAlign: "center" },
    {
        field: "price",
        headerName: "Price",
        flex: 1,
        align: "center",
        headerAlign: "center",
        type: "number",
        valueGetter: (value, row) => row.price,
        valueFormatter: (value) => `$${value}`,
        sortComparator: (v1, v2) => {
            return v1 - v2;
        },
    },
    {
        field: "rating",
        headerName: "Rating",
        flex: 1,
        align: "center",
        headerAlign: "center",
        type: "number",
        valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
    },
    {
        field: "stockQuantity",
        headerName: "Stock Quantity",
        flex: 1,
        align: "center",
        headerAlign: "center",
        type: "number",
    },
];

function Inventory() {
    const { data: products, isError, isLoading } = useGetProductsQuery();
    console.log(products);

    if (isLoading) {
        return <div className="py-4">Loading....</div>;
    }
    if (isError || !products) {
        return <div className="py-4">Error....</div>;
    }

    return (
        <div className="flex flex-col">
            <Header name={"Inventory"} />
            <DataGrid
                rows={products}
                columns={columns}
                getRowId={(row) => row.productId}
                checkboxSelection
                className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
            />
        </div>
    );
}

export default Inventory;
