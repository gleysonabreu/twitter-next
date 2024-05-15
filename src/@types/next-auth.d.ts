import NextAuth, { DefaultSession } from 'next-auth';

export type ExtendedUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  profileImage?: string | null;
  accessToken: string;
};

declare module 'next-auth' {
  interface User extends ExtendedUser {}

  interface Session {
    accessToken: string;
    user: ExtendedUser & DefaultSession['user'];
  }
}
