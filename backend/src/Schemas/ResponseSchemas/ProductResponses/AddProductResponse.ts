import { Type } from "@sinclair/typebox";
import { ProductSchema } from "../../ProductSchemas/AddProductSchema.js";


const AddProductResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean(),
    product: ProductSchema       
});

export default AddProductResponse;