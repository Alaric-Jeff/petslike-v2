import { Type, Static } from "@sinclair/typebox";

const DeleteProductSchema = Type.Object({
    product_id: Type.Number()
});

type DeleteProductType = Static<typeof DeleteProductSchema>;

export {DeleteProductType, DeleteProductSchema};