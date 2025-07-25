import { FastifyInstance } from "fastify";

type ProductInput = {
  product_name: string;
  product_price: number;
  product_stock: number;
  is_discounted: boolean;
  food_category: string;
  diet_category: string;
  life_stage: string;
  animal_type: string;
  product_description?: string | null;
  discount_percentage?: number | null;
};

async function AddProduct(
  fastify: FastifyInstance,
  product: ProductInput
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
