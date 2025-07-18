import compression from '@fastify/compress';
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

const CompressionPlugin = async (fastify: FastifyInstance) => {
    try {
        await fastify.register(compression, {
            threshold: 1024,
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            fastify.log.error(err, 'Error occurred while registering the compression plugin');
        } else {
            fastify.log.error('Unknown error occurred while registering the compression plugin');
        }
        throw err;
    }
};

export default fp(CompressionPlugin, {
    name: 'compression-plugin',
});
