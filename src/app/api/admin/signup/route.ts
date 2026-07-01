import { NextResponse } from "next/server";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // "delete previous if have" - Clear all existing admin users from the database first
    await db.delete(adminUsers);

    // Hash the password securely
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert the new admin user
    const [newAdmin] = await db
      .insert(adminUsers)
      .values({
        email: email.trim().toLowerCase(),
        passwordHash,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "Admin created successfully.",
      admin: {
        id: newAdmin.id,
        email: newAdmin.email,
      },
    });
  } catch (error: any) {
    console.error("Signup failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create admin." },
      { status: 500 }
    );
  }
}
