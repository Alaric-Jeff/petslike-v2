import { FastifyInstance } from "fastify";
import {ProductSchema} from "../Schemas/ProductSchemas/AddProductSchema.js";

async function ProductRouters(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: 'api/products/add-products',
    schema: {
      body: ProductSchema
    },
    preHandler: fastify.compress,
    handler: async (request, reply) => {
      reply.send({ message: "Product created (mock response)" });
    }
  });
}

export default ProductRouters;
