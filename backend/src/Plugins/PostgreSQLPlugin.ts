import pg from 'pg'
import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify';

const PSQLPlugin = async (fastify: FastifyInstance) => {
    try{
        await fastify.decorate("pg", pg);

    
    }catch(err: unknown){
        if(err instanceof Error){
            fastify.log.error(err, `Error occured in decorating PSQL plugin`)
        }else{
            fastify.log.error(`Unknown error occured while decorating PSQL plugin`)
        }
        throw err;
    }
};

export default fp(
    PSQLPlugin,
    {name: "postgresql-plugin"}
);
