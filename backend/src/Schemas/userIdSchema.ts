import {Type, Static} from "@sinclair/typebox";

export const userIdSchema = Type.Object({
    user_id: Type.Integer()
});

export type userIdType = Static<typeof userIdSchema>;