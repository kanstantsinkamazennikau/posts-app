import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string | null;
    };
  }

  // interface User {
  //   name?: string | null;
  //   email: string | null;
  //   image?: string | null;
  //   id?: string | null;
  //   password: string | null;
  // }
}
