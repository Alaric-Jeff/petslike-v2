import { FastifyInstance } from "fastify";
import { UpdateProduct } from "../../Schemas/ProductSchemas/UpdateBodySchema.js";
// TODO - this needs to be monitored, possibly add a cluster or queue here.

async function UpdateProductService(fastify: FastifyInstance, body: UpdateProduct) {
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
    const updatedProduct = await client.query(
      `UPDATE products_table SET ${updates.join(", ")} WHERE product_id = $${index}`,
      values
    );
    
    await client.query("COMMIT");
    return updatedProduct.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export default UpdateProductService;
