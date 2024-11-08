import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/service";
import { resend } from "@/lib/helpers";
import InviteClubMember from "@/emailTemplates/InviteClubMember";
import InviteOcaMember from "@/emailTemplates/InviteOcaMember";
import { NextResponse } from 'next/server';

export async function POST(request) {
  const sb = createClient();
  const sbAdmin = createAdminClient();
  try {
    const { email, password, club_id } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const { data: authUser, error: authUserError } =
      await sbAdmin.auth.admin.createUser({
        email: email,
        password: password,
      });
    if (authUserError) {
      return NextResponse.json(
        { message: "Error creating user" },
        { status: 500 }
      );
    }
    const { data: newUser, error: newUserError } = await sb
      .from("users")
      .insert({
        id: authUser.id,
        email: authUser.email,
      });
    if (newUserError) {
      return NextResponse.json(
        { message: "Error creating user" },
        { status: 500 }
      );
    }

    // Create base profile data
    const profileData = {
      user_id: authUser.id,
      ...(club_id ? { club_id } : { is_oca: true })
    };

    const { data: newProfile, error: newProfileError } = await sb
      .from("profiles")
      .insert(profileData);

    if (newProfileError) {
      return NextResponse.json(
        { message: "Error creating profile" },
        { status: 500 }
      );
    }

    const { error: emailInvitationError } = await resend.emails.send({
      from: "OCA Connect <team@oca.connect>",
      to: email,
      subject: `Welcome to OCA Connect, ${email}!`,
      react: club_id ? InviteClubMember({
        email,
        password,
      }) : InviteOcaMember({
        email,
        password,
      }),
      text: "",
    });

    if (emailInvitationError) {
      return NextResponse.json(
        { message: "Error sending email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Invitation sent successfully" });
    
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
