import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductByID, searchProducts, updateProduct, } from "../controllers/productController.js";

const productRouter = express.Router(); 

productRouter.get("/", getAllProducts)
productRouter.get("/search/:query", searchProducts)
productRouter.post("/", createProduct)
productRouter.get("/:productID", getProductByID)
productRouter.delete("/:productID",deleteProduct)
productRouter.put("/:productID",updateProduct)



export default productRouter
