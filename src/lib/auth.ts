import bcrypt from "bcrypt";
import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "@/lib/db";

////////////////////////////////

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      nom?: string;
      prenom?: string;
      telephone?: string;
    } & DefaultSession["user"];
  }
  interface JWT {
    id: string;
    nom?: string;
    prenom?: string;
    telephone?: string;
  }
}
interface CustomUser {
  id: string;
  email: string;
  motDePasseHache: string;
  nom?: string;
  prenom?: string;
  telephone?: string;
}

//----------------------------------------------------------------

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await db.utilisateur.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.motDePasseHache) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.motDePasseHache,
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  ////////////////////////////////
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.id = customUser.id;
        token.nom = customUser.nom;
        token.prenom = customUser.prenom;
        token.telephone = customUser.telephone;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.nom = token.nom as string;
        session.user.prenom = token.prenom as string;
        session.user.telephone = token.telephone as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  ////////////////////////////////
};
