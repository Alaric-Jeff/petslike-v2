import { FastifyInstance } from "fastify";
import ProductRouters from "./ProductRouters.js";

async function registerRouters(fastify: FastifyInstance){
    await fastify.register(ProductRouters);
};

export default registerRouters;