"use client";
import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { PlusIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import Header from "../(components)/Header";
import Rating from "../(components)/Rating";
import CreateProductModal, { ProductFormData } from "./CreateProductModal";

const Products = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModelOpen, setIsModalOpen] = useState(false);

    const { data: products, isError, isLoading, refetch } = useGetProductsQuery(searchTerm);
    const [createProductMutation] = useCreateProductMutation();
    const handleCreateProduct = async (productData: ProductFormData) => {
        await createProductMutation(productData);
    };
    if (isLoading) {
        return <div className="py-4">Loading....</div>;
    }
    if (isError || !products) {
        return <div className="py-4">Error....</div>;
    }
    return (
        <div className="mx-auto pb-5 w-full">
            {/* Search bar */}
            <div className="mb-6">
                <div className="flex items-center border-2 border-gray-200 rounded">
                    <SearchIcon className="size-5 text-gray-700 m-2" />
                    <input
                        className="w-full py-2 px-4 rounded bg-white focus:outline-none"
                        placeholder="Search Products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            {/* Header bar */}
            <div className="flex justify-between items-center mb-6">
                <Header name="Products" />
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded text-white"
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusIcon className="size-5 mr-2 !text-gray-200" /> Create Product
                </button>
            </div>

            {/* Body products list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    products?.map((product) => (
                        <div
                            key={product.productId}
                            className="border shadow-md rounded-md p-4 max-w-full w-full mx-auto"
                        >
                            <div className="flex flex-col items-center">
                                img
                                <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
                                <p className="text-gray-800">${product.price?.toFixed(2)}</p>
                                <div className="text-sm text-gray-700 mt-1">Stock: {product.stockQuantity}</div>
                                {product.rating && (
                                    <div className="flex items-center mt-2">
                                        <Rating rating={product.rating} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <CreateProductModal
                isOpen={isModelOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
                onCreate={handleCreateProduct}
            />
        </div>
    );
};

export default Products;
