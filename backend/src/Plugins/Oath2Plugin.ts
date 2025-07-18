import fp from 'fastify-plugin';
import oauthPlugin from '@fastify/oauth2';
import { FastifyInstance } from 'fastify';

const oauthProviders = async (fastify: FastifyInstance) => {
  const providers = [
    {
      name: 'googleOAuth2',
      config: {
        scope: ['profile', 'email'],
        credentials: {
          client: {
            id: process.env.GOOGLE_CLIENT_ID!,
            secret: process.env.GOOGLE_CLIENT_SECRET!,
          },
          auth: (oauthPlugin as any ).GOOGLE_CONFIGURATION,
        },
        startRedirectPath: '/login/google',
        callbackUri: process.env.GOOGLE_CALLBACK_URI!,
      },
    },
    {
      name: 'githubOAuth2',
      config: {
        scope: ['user:email'],
        credentials: {
          client: {
            id: process.env.GITHUB_CLIENT_ID!,
            secret: process.env.GITHUB_CLIENT_SECRET!,
          },
          auth: (oauthPlugin as any ).GITHUB_CONFIGURATION,
        },
        startRedirectPath: '/login/github',
        callbackUri: process.env.GITHUB_CALLBACK_URI!,
      },
    },
    {
      name: 'facebookOAuth2',
      config: {
        scope: ['email'],
        credentials: {
          client: {
            id: process.env.FACEBOOK_CLIENT_ID!,
            secret: process.env.FACEBOOK_CLIENT_SECRET!,
          },
          auth: (oauthPlugin as any ).FACEBOOK_CONFIGURATION,
        },
        startRedirectPath: '/login/facebook',
        callbackUri: process.env.FACEBOOK_CALLBACK_URI!,
      },
    },
  ];

  for (const provider of providers) {
    await fastify.register((oauthPlugin as any ), provider.config);
  }
};

export default fp(oauthProviders, { name: 'oauth-plugin' });