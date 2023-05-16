import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/prisma";
import { compareHashString } from "@/app/utils/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, _) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compareHashString(password, user.password || ""))) {
          throw new Error("Invalid username or password");
        }
        return user;
      },
    }),
  ],
  secret: process.env.SECRET,
  session: { strategy: "jwt", maxAge: 1 * 24 * 30 * 60 },
  callbacks: {
    async signIn(tehe) {
      console.log("[signIn]", tehe)
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, ...rest }) {
      console.log("[session]", { ...rest, session })
      return session
    },
    async jwt({ token, ...rest }) {
      console.log("[jwt]", { ...rest, token })
      return token
    }
  }
}

export default NextAuth(authOptions);
