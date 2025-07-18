import Fastify from 'fastify';
import dotenv from 'dotenv'
import CompressionPlugin from './Plugins/CompressionPlugin.js';

dotenv.config();

const fastify = Fastify({
    logger: true
});

fastify.register(CompressionPlugin);

try{
    fastify.listen({
        port: process.env.http_port? Number(process.env.http_port) : 3000,
        host: process.env.host? String(process.env.host) : `127.0.0.1`
    }).then(()=> {
        fastify.log.info(`Server is running on port: ${process.env.http_port}, host: ${process.env.host}`)
    });

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

