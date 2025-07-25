import { FastifyInstance } from "fastify";

// TODO - this needs to be monitored, possibly add a cluster or queue here.

type UpdateInput = {
    product_id: number;
    product_name?: string;
    product_price?: number;
    product_stock?: number;
    is_discounted: boolean;
    food_category: string;
    diet_category: string;
    life_category: string;
    animal_type: string;
    product_description?: string;
    discount_percentage?: number;
};

async function UpdateProduct(fastify: FastifyInstance, body: UpdateInput) {
  const {
    product_id,
    ...rest
  } = body;

  const updates: string[] = [];
  const values: any[] = [];
  let index = 1;

  for (const [key, value] of Object.entries(rest)) {
    if (value !== undefined) {
      updates.push(`${key} = $${index++}`);
      values.push(value);
    }
  }

  if (updates.length === 0) return; 

  values.push(product_id);

  const client = await fastify.pg.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `UPDATE products_table SET ${updates.join(", ")} WHERE product_id = $${index}`,
      values
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    await client.release();
  }
}
