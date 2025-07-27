import { FastifyInstance } from "fastify";
import {ProductSchema} from "../Schemas/ProductSchemas/AddProductSchema.js";
import { DeleteProductSchema, DeleteProductType } from "../Schemas/ProductSchemas/DeleteProductSchema.js";
import ErrorResponse from "../Schemas/ResponseSchemas/ErrorResponse.js";
import DeleteProductController from "../Controllers/ProductControllers/DeleteProductController.js";
import AddProductController from "../Controllers/ProductControllers/AddProductController.js";
import ReturnProductFull from "../Schemas/ResponseSchemas/ProductResponses/AddProductResponse.js";
import UpdateProductController from "../Controllers/ProductControllers/UpdateProductController.js";

async function ProductRouters(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/add-product',
    schema: {
      body: ProductSchema, 
      response: {
        200: ReturnProductFull,
        500: ErrorResponse
      }
    },
    preHandler: fastify.compress,
    handler: AddProductController
  });

  fastify.route({
    method: 'POST',
    url: '/delete-product',
    schema: {
      body: DeleteProductSchema, response: {
        200: DeleteProductSchema,
        500: ErrorResponse
      }
    }, handler: DeleteProductController
  });

  fastify.route({
    method: 'POST',
    url: '/update-product',
    schema: {
      body: ProductSchema, 
      response: {
        200: ReturnProductFull, 
        500: ErrorResponse
      }
    }, 
    handler: UpdateProductController
  })
}

export default ProductRouters;
