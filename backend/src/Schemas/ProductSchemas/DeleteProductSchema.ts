import { Type, Static } from "@sinclair/typebox";

const DeleteProductSchema = Type.Object({
    productId: Type.Number()
})

type DeleteProduct = Static<typeof DeleteProductSchema>

export {DeleteProduct, DeleteProductSchema};