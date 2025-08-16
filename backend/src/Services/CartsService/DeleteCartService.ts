import { FastifyInstance } from "fastify";
import { cartIdType } from "../../Schemas/cartSchema.js";
import { userIdType } from "../../Schemas/userIdSchema.js";
async function DeleteCartService(fastify: FastifyInstance, body: [cartIdType, userIdType]){
    const {cart_id} = body[0];
    const {user_id} = body[1];

    const client = await fastify.pg.connect();
    try{
        await client.query("BEGIN");
        const deleted = await client.query("DELETE FROM carts WHERE user_id = $1 AND cart_id = $2", [user_id, cart_id]);

        if(!deleted){
            fastify.log.error(`Failed to delete cart ${cart_id}, of user: ${user_id}`)
            await client.query("ROLLBACK");
            throw new Error(`cart ${cart_id} is not deleted`);
        }

        await client.query("COMMIT");

    }catch(err: unknown){
        await client.query("ROLLBACK");
        throw err;
    }finally{
        client.release();
    }
};

export default DeleteCartService;