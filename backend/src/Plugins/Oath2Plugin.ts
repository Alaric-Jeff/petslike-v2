import fp from 'fastify-plugin';
import oauthPlugin from '@fastify/oauth2';
import { FastifyInstance } from 'fastify';

const oauthProviders = async (fastify: FastifyInstance) => {
  await fastify.register(oauthPlugin, {
    name: 'googleOAuth2',
    scope: ['profile', 'email'],
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID!,
        secret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      auth: (oauthPlugin as any).GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/login/google',
    callbackUri: process.env.GOOGLE_CALLBACK_URI!,
  });
};

export default fp(oauthProviders, { name: 'oauth-plugin' });
