import { FastifyInstance } from "fastify";
import {ProductSchema} from "../Schemas/ProductSchemas/AddProductSchema.js";
import AddProductController from "../Controllers/ProductControllers/AddProductController.js";

async function ProductRouters(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: 'api/products/add-products',
    schema: {
      body: ProductSchema
    },
    preHandler: fastify.compress,
    handler: AddProductController
  });
}

export default ProductRouters;
