import { FastifyInstance } from "fastify";
import { Product } from "../../Schemas/ProductSchemas/AddProductSchema.js";

async function AddProduct(
  fastify: FastifyInstance,
  product: Product
) {
  const {
    product_name,
    product_price,
    product_stock,
    is_discounted,
    discount_percentage,
    product_description,
    food_category,
    diet_category,
    life_stage,
    animal_type
  } = product;

  const client = await fastify.pg.connect();
  try {
    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO products_table (
        product_name,
        product_price,
        product_stock,
        is_discounted,
        discount_percentage,
        product_description,
        food_category,
        diet_category,
        life_stage,
        animal_type
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        product_name,
        product_price,
        product_stock,
        is_discounted,
        discount_percentage,
        product_description,
        food_category,
        diet_category,
        life_stage,
        animal_type
      ]
    );

    await client.query("COMMIT");
    fastify.log.info(`successfull`)
    return result.rows[0];
  } catch (err: unknown) {
    
    await client.query("ROLLBACK");
    if (err instanceof Error) {
      fastify.log.error(`AddProduct error: ${err.message}`);
    } else {
      fastify.log.error("AddProduct unknown error");
    }

    throw new Error(`Failed to create product: ${product_name}`);
  }finally{
    client.release();
  }
}

export default AddProduct;
