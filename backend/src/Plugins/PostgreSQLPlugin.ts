import pg from 'pg';
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

const PSQLPlugin = fp(async (fastify: FastifyInstance, opts: pg.PoolConfig) => {
  try {
    const pool = new pg.Pool(opts);
    await pool.connect().then(client => client.release());

    fastify.decorate('pg', pool);

    fastify.addHook('onClose', async () => {
      await pool.end(); 
    });

  } catch (err: unknown) {
    if (err instanceof Error) {
      fastify.log.error(err, 'Error occurred in decorating PSQL plugin');
    } else {
      fastify.log.error('Unknown error occurred while decorating PSQL plugin');
    }
    throw err;
  }
});

export default PSQLPlugin;