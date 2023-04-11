import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions : NextAuthOptions= {
 providers: [
  GoogleProvider({
    clientId: process.env.CLIENT_ID ?? "",
    clientSecret: process.env.SECRET ?? "",
  }),
 ],
 session: {
  strategy: 'jwt',
 },
};
export default NextAuth(authOptions);
