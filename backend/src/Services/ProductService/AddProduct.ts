import { FastifyInstance } from "fastify";

type ProductInput = {
  productName: string;
  productPrice: number;
  productStock: number;
  isDiscounted: boolean;
  foodCategory: string;
  dietCategory: string;
  lifeStage: string;
  animalType: string;
  productDescription?: string | null;
  discountPercentage?: number | null;
};

async function AddProduct(
  fastify: FastifyInstance,
  product: ProductInput
) {
  const {
    productName,
    productPrice,
    productStock,
    isDiscounted,
    discountPercentage,
    productDescription,
    foodCategory,
    dietCategory,
    lifeStage,
    animalType
  } = product;

  try {
    await fastify.pg.query("BEGIN");

    const result = await fastify.pg.query(
      `INSERT INTO products_table (
        productName,
        productPrice,
        productStock,
        isDiscounted,
        discountPercentage,
        productDescription,
        foodCategory,
        dietCategory,
        lifeStage,
        animalType
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        productName,
        productPrice,
        productStock,
        isDiscounted,
        discountPercentage,
        productDescription,
        foodCategory,
        dietCategory,
        lifeStage,
        animalType
      ]
    );

    await fastify.pg.query("COMMIT");
    return result.rows[0];

  } catch (err: unknown) {
    await fastify.pg.query("ROLLBACK");

    if (err instanceof Error) {
      fastify.log.error(`AddProduct error: ${err.message}`);
    } else {
      fastify.log.error("AddProduct unknown error");
    }

    throw new Error(`Failed to create product: ${productName}`);
  }
}

export default AddProduct;
