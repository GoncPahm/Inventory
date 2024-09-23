import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "../(components)/Header";
export type ProductFormData = {
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
};

type CreateProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({ isOpen, onClose, onCreate }: CreateProductModalProps) => {
    const [formData, setFormData] = useState({
        productId: v4(),
        name: "",
        price: 0,
        rating: 0,
        stockQuantity: 0,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "rating" || name === "stockQuantity" ? parseFloat(value) : value,
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Create New Product" />
                <form onSubmit={handleSubmit} className="mt-5">
                    {/* name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Product name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={handleChange}
                            value={formData.name}
                            className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
                        />
                    </div>
                    {/* price */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Product price
                        </label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            onChange={handleChange}
                            value={formData.price}
                            className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
                        />
                    </div>
                    {/* rating */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Product rating
                        </label>
                        <input
                            type="number"
                            name="rating"
                            placeholder="Rating"
                            onChange={handleChange}
                            value={formData.rating}
                            className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
                        />
                    </div>
                    {/* Stock */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Product stock
                        </label>
                        <input
                            type="number"
                            name="stockQuantity"
                            placeholder="Stock"
                            onChange={handleChange}
                            value={formData.stockQuantity}
                            className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
                        />
                    </div>
                    <button type="submit" className="text-center bg-blue-300 w-full py-2 text-white rounded mt-3">Create</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProductModal;
