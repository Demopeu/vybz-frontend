import { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import { CommonResponseType, UserDataType } from '@/types/ResponseDataTypes';

export const options: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (profile && account) {
        // console.log('profile', profile);
        // console.log('account', account);
        // console.log('user', user);
        try {
          const res = await fetch(
            `${process.env.BASE_API_URL}/api/v1/oauth/sign-in`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                provider: account.provider,
                accessToken: account.access_token,
              }),
              cache: 'no-cache',
            }
          );
          const data = (await res.json()) as CommonResponseType<UserDataType>;
          user.accessToken = data.result.accessToken;
          user.refreshToken = data.result.refreshToken;
          user.userUuid = data.result.userUuid;
          return true;
        } catch (error) {
          console.error('error', error);
          throw new Error('OAuthTokenMissing');
        }
      } else {
        throw new Error('OAuthProfileMissing');
      }
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = {
        userUuid: token.userUuid as string,
        isLogined: !!token.accessToken,
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      const isInternalUrl = url.startsWith(baseUrl);

      if (isInternalUrl && url !== baseUrl) {
        return url;
      }

      return `${baseUrl}/main`;
    },
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
};
