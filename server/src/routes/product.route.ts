import { Router } from "express";
import { createProduct, getProducts } from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);
router.post("/create", createProduct);

export default router;
