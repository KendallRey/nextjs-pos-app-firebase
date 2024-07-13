import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SESSION } from "@/constants/SESSION";
import { getAxiosApiError } from "@/redux/helper/error";
import AxiosInstance from "../../axios";
import { AuthTokenSchema, RefreshTokenSchema } from "@/app/model/auth";

const authOptions: AuthOptions = {
  providers: [
    Credentials({
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { username, password } = credentials;

        const postData = {
          username,
          password,
        };

        try {
          const authToken = await AxiosInstance.post("api/auth/token/", postData);
          return authToken.data;
        } catch (err) {
          const error = getAxiosApiError(err);
          throw Error(error.detail);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const authTokenValidation = AuthTokenSchema.safeParse(token.user);
      if (!authTokenValidation.success) return session;
      if (token) {
        session.user = authTokenValidation.data;
      }
      return session;
    },
    async jwt({ token, user, trigger }) {
      if (user && trigger === "signIn") {
        token.user = user;
        return token;
      }

      const authTokenValidation = AuthTokenSchema.safeParse(token.user);
      if (!authTokenValidation.success) return token;

      const postData = {
        refresh: authTokenValidation.data.refresh,
      };

      const refreshedToken = await AxiosInstance.post("api/auth/token/refresh/", postData);
      const refreshTokenValidation = RefreshTokenSchema.safeParse(refreshedToken.data);

      if (refreshedToken.status === 200 && refreshTokenValidation.success) {
        token.user = { ...authTokenValidation.data, ...refreshTokenValidation.data };
      }

      return token;
    },
  },
  session: {
    maxAge: SESSION.LIFE_TIME,
  },
  debug: process.env.NODE_ENV !== "production",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
