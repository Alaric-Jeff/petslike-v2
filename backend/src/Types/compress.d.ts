import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    compress: (input: Buffer | string) => Promise<Buffer>;
  }
}
