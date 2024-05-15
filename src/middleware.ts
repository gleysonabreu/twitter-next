import { auth } from '../auth';
import { env } from './config/env';
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  restrictRoutes,
} from './config/routes';

const redirectToLogin = (callbackUrl: string, url: URL): Response => {
  const encodedCallbackUrl = encodeURIComponent(callbackUrl);

  return Response.redirect(
    new URL(`/auth/sign-in?callbackUrl=${encodedCallbackUrl}`, url),
  );
};

const redirectToDefaultLogin = (url: URL): Response => {
  return Response.redirect(new URL(env.DEFAULT_LOGIN_REDIRECT, url));
};

export default auth((request) => {
  const { nextUrl, auth } = request;
  const isLoggedIn = !!auth;

  const isApiRoute: boolean = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute: boolean = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute: boolean = authRoutes.includes(nextUrl.pathname);
  const isRestrictRoute: boolean = restrictRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    return null;
  }

  if (isRestrictRoute && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    return redirectToLogin(callbackUrl, nextUrl);
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return redirectToDefaultLogin(nextUrl);
    }

    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    return redirectToLogin(callbackUrl, nextUrl);
  }

  return null;
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)'],
};
