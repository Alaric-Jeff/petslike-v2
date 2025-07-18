import compression from '@fastify/compress';
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { gzip, Gzip } from 'zlib';
import { promisify } from 'util';

//! maybe i should allow passing options for configurable options
//! also probably I need to change this be decorated in route-level after I've a better understanding

const GzipAsync = promisify(gzip);

const CompressionPlugin = async (fastify: FastifyInstance) => {
    try {
        await fastify.register(compression, {
            threshold: 1024,
            inflateIfDeflated: true,
            global: false,
            encodings: ['gzip'],
            zlibOptions: {
                level: 4
            },
            customTypes: /^text\/|\+json$|\+text$|\+xml$|application\/json$/
        });

        fastify.decorate("compress", GzipAsync);
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
