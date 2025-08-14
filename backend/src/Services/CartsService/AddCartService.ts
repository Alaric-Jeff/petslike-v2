import { FastifyInstance } from "fastify";
import { userIdType } from "../../Schemas/userIdSchema.js";
async function AddCartService(fastify: FastifyInstance, id: userIdType){
    const{
        user_id
    } = id;

    const client = await fastify.pg.connect();

    try{
        await client.query("BEGIN");
        const newCart =  await client.query("INSERT INTO carts(user_id) VALUES ($1) *", [user_id]);
        await client.query("COMMIT");

        if(newCart.rowCount === 0){
            fastify.log.info(`Failed to create cart for user: ${user_id}, error: ${newCart}`);
            throw new Error("Failed to create new cart");
        }

        return newCart.rows[0];
    }catch(err: unknown){
        await client.query("ROLLBACK");
        throw new Error("AddCartService() failed, err: " + err);
    }finally{
        client.release();
    }
}

export default AddCartService;