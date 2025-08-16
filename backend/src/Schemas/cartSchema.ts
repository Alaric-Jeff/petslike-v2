import { Type, Static } from "@sinclair/typebox";

export const cartIdSchema = Type.Object({
    cart_id: Type.Integer()
})

export type cartIdType = Static<typeof cartIdSchema>;

