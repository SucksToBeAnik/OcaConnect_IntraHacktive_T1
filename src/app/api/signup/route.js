import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(request) {
  const sb = createClient();
  try {
    const body = await request.json();
    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }
    const { data, error } = await sb.auth.signUp({
      email: body.email,
      password: body.password,
    });
    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
