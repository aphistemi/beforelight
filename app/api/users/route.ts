import { NextRequest, NextResponse } from "next/server";
import { storage } from "../_lib/storage";
import { insertUserSchema } from "@/shared/schema";
import { ZodError } from "zod";

export async function GET() {
  try {
    // Example endpoint - in real app you might list users or get current user
    return NextResponse.json({ message: "Users API endpoint" });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body using Zod schema
    const validatedData = insertUserSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await storage.getUserByUsername(validatedData.username);
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }
    
    // Create new user
    const newUser = await storage.createUser(validatedData);
    
    // Return user without password
    const { password, ...userResponse } = newUser;
    return NextResponse.json(userResponse, { status: 201 });
    
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }
    
    console.error("POST /api/users error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}