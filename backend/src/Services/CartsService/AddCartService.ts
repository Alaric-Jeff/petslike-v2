import { FastifyInstance } from "fastify";
import { userIdType } from "../../Schemas/userIdSchema.js";
async function AddCartService(fastify: FastifyInstance, id: userIdType){
    const{
        user_id
    } = id;

    const client = await fastify.pg.connect();

    try{
        await client.query("BEGIN");
        await client.query("INSERT INTO carts(user_id) VALUES ($1) *", [user_id]);
        await client.query("COMMIT");
    }catch(err: unknown){
        await client.query("ROLLBACK");
        throw new Error("AddCartService() failed, err: " + err);
    }finally{
        client.release();
    }
}

export default AddCartService;