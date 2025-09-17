// app/api/setup/founder/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, setupKey } = body;

    // Simple security check - you can change this key
    const SETUP_KEY = "create-founder-2024"; // Change this to something secure
    
    if (setupKey !== SETUP_KEY) {
      return NextResponse.json({ error: "Invalid setup key" }, { status: 401 });
    }

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 });
    }

    console.log("🔍 Checking if founder already exists...");
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log("✅ User already exists:", {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role
      });
      
      // Update role to FOUNDER if it's not already
      if (existingUser.role !== 'FOUNDER') {
        const updatedUser = await prisma.user.update({
          where: { id: existingUser.id },
          data: { role: 'FOUNDER' }
        });
        
        return NextResponse.json({ 
          message: "User already exists, role updated to FOUNDER",
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            role: updatedUser.role
          }
        });
      }
      
      return NextResponse.json({ 
        message: "Founder already exists",
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role
        }
      });
    }

    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("👤 Creating founder account...");
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'FOUNDER',
        emailVerified: new Date(),
      }
    });

    console.log("✅ Founder account created successfully!");

    return NextResponse.json({ 
      message: "Founder account created successfully!",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error("❌ Error creating founder:", error);
    return NextResponse.json({ 
      error: "Failed to create founder account",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // This endpoint will show you all users in the database
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    return NextResponse.json({ 
      message: "Current users in database",
      users: allUsers,
      count: allUsers.length
    });

  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return NextResponse.json({ 
      error: "Failed to fetch users"
    }, { status: 500 });
  }
}
