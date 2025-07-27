import { FastifyInstance } from "fastify";
import {ProductSchema} from "../Schemas/ProductSchemas/AddProductSchema.js";
import { DeleteProductSchema } from "../Schemas/ProductSchemas/DeleteProductSchema.js";
import DeleteProductController from "../Controllers/ProductControllers/DeleteProductController.js";
import AddProductController from "../Controllers/ProductControllers/AddProductController.js";
import AddProductResponse from "../Schemas/ResponseSchemas/ProductResponses/AddProductResponse.js";

async function ProductRouters(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/add-product',
    schema: {
      body: ProductSchema, 
      response: {
        200: AddProductResponse,
      }
    },
    preHandler: fastify.compress,
    handler: AddProductController
  });

  fastify.route({
    method: 'POST',
    url: '/delete-product',
    schema: {
      body: DeleteProductSchema
    }, handler: DeleteProductController
  });

}

export default ProductRouters;
