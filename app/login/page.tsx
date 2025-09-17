// lib/auth.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { type NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔐 Login attempt with email:", credentials?.email); // Debug log
        
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing email or password"); // Debug log
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        console.log("👤 Found user:", user ? { id: user.id, email: user.email, role: (user as any).role } : "No user found"); // Debug log

        if (!user) {
          console.log("❌ No user found with email:", credentials.email); // Debug log
          throw new Error("No user found with this email");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log("🔑 Password valid:", isValid); // Debug log

        if (!isValid) {
          console.log("❌ Invalid password for user:", credentials.email); // Debug log
          throw new Error("Invalid password");
        }

        console.log("✅ Login successful for user:", { id: user.id, email: user.email, role: (user as any).role }); // Debug log
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("🎟️ JWT callback - setting role:", (user as any).role); // Debug log
        token.role = (user as any).role;
      }
      console.log("🎟️ JWT token:", { email: token.email, role: token.role }); // Debug log
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        console.log("📋 Session callback - setting role:", token.role); // Debug log
        (session.user as any).role = token.role;
      }
      console.log("📋 Final session:", { email: session.user?.email, role: (session.user as any)?.role }); // Debug log
      return session;
    },
  },
};
