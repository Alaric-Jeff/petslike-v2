import { Type, Static } from "@sinclair/typebox";

const DeleteProductSchema = Type.Object({
    productId: Type.Number()
});

type DeleteProductType = Static<typeof DeleteProductSchema>;

export {DeleteProductType, DeleteProductSchema};