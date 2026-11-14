import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    provider?: string;
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}
