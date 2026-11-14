import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    ...authConfig.callbacks,
    jwt({ token, user, account }) {
      if (user?.id) {
        token.sub = user.id;
      }
      if (account?.provider) token.provider = account.provider;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      session.provider = typeof token.provider === "string" ? token.provider : undefined;
      return session;
    },
  },
});
