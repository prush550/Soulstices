import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prismadb";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("Received update data:", body); // Debug log

    const { name, hobbiesAndInterests, bio, password } = body;

    const updateData: any = {};
    
    // Handle fields that can be empty strings
    if (name !== undefined) updateData.name = name;
    if (hobbiesAndInterests !== undefined) updateData.hobbiesAndInterests = hobbiesAndInterests;
    if (bio !== undefined) updateData.bio = bio;
    
    if (password) {
      const bcrypt = require("bcryptjs");
      updateData.password = await bcrypt.hash(password, 10);
    }

    console.log("Update data to be applied:", updateData); // Debug log

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
    });

    console.log("Updated user:", updatedUser); // Debug log

    // Return the updated user data
    return NextResponse.json({ 
      message: "Profile updated successfully", 
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        hobbiesAndInterests: updatedUser.hobbiesAndInterests,
        bio: updatedUser.bio,
        email: updatedUser.email
      }
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
