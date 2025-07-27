import Fastify from 'fastify';
import dotenv from 'dotenv'
import PSQLPlugin from './Plugins/PostgreSQLPlugin.js';
import RegisterRouters from './Routers/index.js';
import compress from '@fastify/compress';
import helmet from '@fastify/helmet'
import fs from 'fs';

dotenv.config();

// TODO - some of this shi plugins were rushed and ungracefully non-modularized, I'll modularize this when I get the chance

const fastify = Fastify({
  logger: true,
  http2: true
});

fastify.register(RegisterRouters)
fastify.register(helmet, {global: true});
fastify.register(PSQLPlugin, {
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 10000
});
fastify.register(compress, {
    global: false,
    encodings: ['gzip'],
    threshold: 1024,
    inflateIfDeflated: true,
    customTypes: /^text\/|\+json$|\+text$|\+xml$|application\/json$/
});

try{
    fastify.listen({
        port: process.env.http_port? Number(process.env.http_port) : 3000,
        host: process.env.host? String(process.env.host) : `127.0.0.1`
    });
    fastify.log.info(`Server is running on port: ${process.env.http_port}, host: ${process.env.host}`);
}catch(err: unknown){
    if(err instanceof Error){
        fastify.log.error(`Error occured while attempting to run the server, error: ${err}`)
    }else{
        fastify.log.error(`Unknown error occured, error: ${err}`)
    }
    fastify.close().then(()=> {
        process.exit(1);
    });
}

