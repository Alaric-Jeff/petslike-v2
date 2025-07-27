import { Type } from "@sinclair/typebox";
import { ProductSchema } from "../../ProductSchemas/AddProductSchema.js";


const ReturnProductFull = Type.Object({
    message: Type.String(),
    success: Type.Boolean(),
    product: ProductSchema
});

export default ReturnProductFull;