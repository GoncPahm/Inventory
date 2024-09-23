"use client";

import { useGetUsersQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import Header from "../(components)/Header";

const columns: GridColDef[] = [
    { field: "userId", headerName: "ID", flex: 1, align: "center", headerAlign: "center" },
    { field: "name", headerName: "Name", flex: 1, align: "center", headerAlign: "center" },
    { field: "email", headerName: "Email", flex: 1, align: "center", headerAlign: "center" },
];

function Users() {
    const { data: users, isError, isLoading } = useGetUsersQuery();
    console.log(users);

    if (!users || isError) {
        return <div>Failed to fetching data</div>;
    }
    if (isLoading) {
        return <div>Loading....</div>;
    }

    return (
        <div className="flex flex-col">
            <Header name={"Users"} />
            <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row.userId}
                checkboxSelection
                className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
            />
        </div>
    );
}

export default Users;
