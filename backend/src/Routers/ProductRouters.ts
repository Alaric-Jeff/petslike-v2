import { FastifyInstance } from "fastify";
import {ProductSchema} from "../Schemas/ProductSchemas/AddProductSchema.js";
import { DeleteProductSchema } from "../Schemas/ProductSchemas/DeleteProductSchema.js";
import DeleteProductController from "../Controllers/ProductControllers/DeleteProductController.js";
import AddProductController from "../Controllers/ProductControllers/AddProductController.js";

async function ProductRouters(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: 'api/products/add-product',
    schema: {
      body: ProductSchema
    },
    preHandler: fastify.compress,
    handler: AddProductController
  });

  fastify.route({
    method: 'POST',
    url: 'api/products/delete-product',
    schema: {
      body: DeleteProductSchema
    }, handler: DeleteProductController
  });

}

export default ProductRouters;
