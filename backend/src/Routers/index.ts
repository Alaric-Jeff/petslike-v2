import { FastifyInstance } from "fastify";
import ProductRouters from "./ProductRouters.js";


async function RegisterRouters(fastify: FastifyInstance){
    await fastify.register(ProductRouters, {prefix: '/api/products'});
};

export default RegisterRouters;