import {FastifyInstance} from "fastify";

async function DeleteProduct(fastify: FastifyInstance, product_id: number){
    const client = await fastify.pg.connect();
    try{
        await client.query(`BEGIN`);
        const result = await fastify.pg.query(`
            DELETE FROM products_table
            WHERE productId = $1
            RETURNING productId`, [product_id]);

        await client.query(`COMMIT`);
        return result.rows[0];
    }catch(err: unknown){
        await client.query(`ROLLBACK`);
        if(err instanceof Error){
            fastify.log.error(`DeleteProduct error: ${err.message}`)
        }else{
            fastify.log.error(`DeleteProduct unknown error`)
        }
        throw new Error(`Error deleting product ${product_id}`)
    }finally{
        await client.release();
    }
}

export default DeleteProduct;