import { FastifyInstance, preHandlerHookHandler } from "fastify";

declare module 'fastify' {
  interface FastifyInstance {
    compress: preHandlerHookHandler;
  }
}
