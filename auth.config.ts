import { api } from '@/lib/api';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  pages: {
    signIn: '/auth/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 604800, // 7 days
  },
  callbacks: {
    session: ({ session, token }) => {
      if (token.sub && session.user) {
        session.user.id = token.id as string;
      }

      if (session) {
        session.accessToken = token.accessToken as string;
      }

      if (session.user) {
        session.user.username = token.username as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.profileImage = token.profileImage as string | null;
        session.user.email = token.email as string;
      }
      return session;
    },

    jwt: ({ token, user, trigger, session }) => {
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.username = user.username;
        token.email = user.email;
        token.sub = user.id;
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.profileImage = user.profileImage;
      }

      if (trigger === 'update' && session) {
        token = { ...token, ...session.user };
        return token;
      }

      return token;
    },
  },
  providers: [
    Credentials({
      name: 'Credentials',
      async authorize(credentials) {
        try {
          const res = await api('/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              login: credentials.login,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            return null;
          }

          const responseBody = await res.json();

          const resUser = await api('/me', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${responseBody.accessToken}`,
            },
          });

          if (!resUser.ok) return null;

          if (resUser.status === 200) {
            const userBody = await resUser.json();

            return {
              ...userBody,
              accessToken: responseBody.accessToken,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
