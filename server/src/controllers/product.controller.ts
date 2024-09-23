import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const search = req.query.search?.toString();
        const products = await prisma.products.findMany({
            where: {
                name: {
                    contains: search,
                },
            },
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);

    try {
        const newProduct = await prisma.products.create({
            data: req.body,
        });
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
