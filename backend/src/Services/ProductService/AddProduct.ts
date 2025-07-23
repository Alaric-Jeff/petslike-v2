import { FastifyInstance } from "fastify";

async function AddProduct(fastify: FastifyInstance, 
    productName: string,
    productPrice: number,
    productStock: number,
    isDiscounted: boolean,
    foodCategory: string,
    dietCategory: string,
    lifeStage: string,
    animalType: string,
    productDescription?: string | null,
    discountPercentage?: number | null
){
    try{
        await fastify.pg.query('BEGIN');
        const result = await fastify.pg.query(
            'INSERT INTO products_table(productName, productPrice, productStock, isDiscounted, discountPercentage, productDescription, foodCategory, dietCategory, lifeStage, animalType) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)  RETURNING*', [
                productName, productPrice, productStock, isDiscounted, discountPercentage, productDescription, foodCategory, dietCategory, lifeStage, animalType
            ]
        );
        fastify.log.info({
            productName,
            productPrice,
            productStock,
            productDescription
        })
        await fastify.pg.query('COMMIT');
        return result.rows[0];
    }catch(err: unknown){
        if(err instanceof Error){
            fastify.log.error(`Error occured in add product services, error: ${err.message}`)
        }else{
            fastify.log.error(`Unknown error occured`)
        }
        await fastify.pg.query('ROLLBACK');
        throw err;
    }
};

export default AddProduct;
