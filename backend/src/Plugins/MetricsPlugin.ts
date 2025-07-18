import metricsPlugin  from 'fastify-metrics';
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

const MetricsPlugin = async (fastify: FastifyInstance) => {
  try {
    await fastify.register(metricsPlugin.default, {
      endpoint: '/metrics',
      routeMetrics: {
        overrides: {
          histogram: {
            name: 'http_request_duration_seconds',
            buckets: [0.1, 0.5, 1, 2, 5],
          },
        },
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      fastify.log.error(`Error occurred in metrics plugin, error: ${err}`);
    } else {
      fastify.log.error(`Unknown error occurred`);
    }
    throw err;
  }
};

export default fp(MetricsPlugin, { name: 'metrics-plugin' });
