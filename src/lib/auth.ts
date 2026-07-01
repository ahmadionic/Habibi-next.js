import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const emailInput = credentials.email as string;
        const passwordInput = credentials.password as string;

        // Fetch admin user from the database
        let admin = null;
        try {
          const rows = await db
            .select()
            .from(adminUsers)
            .where(eq(adminUsers.email, emailInput))
            .limit(1);
          admin = rows[0] || null;
        } catch (error) {
          console.error("Database query failed during admin authorization:", error);
          return null;
        }

        if (!admin) {
          return null;
        }

        // Compare password input to the stored bcrypt hash
        const isValid = await bcrypt.compare(
          passwordInput,
          admin.passwordHash
        );

        if (!isValid) {
          return null;
        }

        // Return a representation of the user
        return {
          id: String(admin.id),
          email: admin.email,
          name: "Claire Olivier",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Add custom property to user object
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
