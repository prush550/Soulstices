// app/api/signup/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Define allowed roles
const ALLOWED_ROLES = ["FOUNDER", "COLLABORATOR", "MEMBER"] as const;
type Role = (typeof ALLOWED_ROLES)[number];

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  // Validate role or fallback to MEMBER
  const validatedRole: Role = ALLOWED_ROLES.includes(role) ? role : "MEMBER";

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: validatedRole
    }
  });

  return NextResponse.json({ message: "User created", user });
}
