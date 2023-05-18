import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/prisma";
import { compareHashString } from "@/app/utils/auth";
import config from "@/app/config";

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
          throw new Error("Missing username or password!");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compareHashString(password, user.password || ""))) {
          throw new Error("Invalid username or password!");
        }
        if (!user.emailVerified){
          throw new Error("Account not verified!");
        }
        return user;
      },
    }),
  ],
  secret: config.SECRET,
  session: { strategy: "jwt", maxAge: 1 * 24 * 30 * 60 },
  callbacks: {
    async signIn() {
      return true
    },
    async redirect({baseUrl }) {
      return baseUrl
    },
    async session({ session }) {
      return session
    },
    async jwt({ token }) {
      return token
    }
  }
}

export default NextAuth(authOptions);
