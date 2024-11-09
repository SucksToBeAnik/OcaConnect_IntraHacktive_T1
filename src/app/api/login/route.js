import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
  const sb = createClient();
  try {
    const body = await request.json();

    // Input validation - trim and sanitize
    const email = body.email?.trim();
    const password = body.password?.trim();

    if (!email || !password) {
      return Response.json({ message: "Email and password are required" });
    }

    const { data, error } = await sb.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Don't expose internal error messages
      return Response.json({ message: "Invalid credentials" });
    }

    // Return the session data along with success message
    return Response.json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    // Don't expose internal error messages to client
    return Response.json({ message: "Authentication failed" });
  }
}
