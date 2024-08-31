import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { checkUser } from "./actions/users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || typeof credentials.email !== "string") {
          throw new Error("Email is required and must be a string");
        }

        if (
          !credentials?.password ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Password is required and must be a string");
        }

        try {
          const user = await checkUser(credentials.email);

          if (!user) {
            throw new Error("Invalid email or password");
          }

          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid email or password");
          }

          return {
            id: user.id,
            email: user.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            name: `${user.firstName} ${user?.middleName} ${user.lastName}`,
            role: user.role
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message || "Authorization failed");
          } else {
            throw new Error("An unknown error occurred");
          }
        }
      }
    })
  ],
  pages: {
    signIn: "/login"
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        const role = String(token.role);
        session.user.id = token.sub;
        session.user.role = role;
        session.user.name = token.name || "";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    }
  }
});
