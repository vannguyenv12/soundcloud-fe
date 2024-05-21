import NextAuth from "next-auth";

import { JWT } from "next-auth/jwt";

interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  address: string;
  role: string;
  type: string;
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    access_token: string;
    user: IUser;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token: string;
    user: IUser;
  }
}
