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
    const { email, role, club_id } = await request.json();
    if (!email || !role || !club_id) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log(email, role, club_id);
    
    
    const { data: user, error: userError } = await sb
      .from("club_members")
      .select("id")
      .eq("email", email).single();
    if (userError) {
      return NextResponse.json(
        { message: "Error fetching club member" },
        { status: 500 }
      );
    }

    const { data: club, error: clubError } = await sb
      .from("clubs")
      .select("name")
      .eq("id", club_id).single();
    if (clubError) {
      return NextResponse.json(
        { message: "Error fetching club" },
        { status: 500 }
      );
    }

    // see if the user already has a profile
    const { data: profile, error: profileError } = await sb
      .from("club_profiles")
      .select("id")
      .eq("club_member_id", user.id).eq("role", role).maybeSingle();

    if (profileError) {
      console.log(profileError);
      return NextResponse.json(
        { message: "Error fetching profile" },
        { status: 500 }
      );
    }

    if (profile) {
      return NextResponse.json(
        { message: "Profile already exists" },
        { status: 400 }
      );
    }

    const { data: newProfile, error: newProfileError } = await sb
      .from("club_profiles")
      .insert({
        club_id: club_id,
        role:role,
        club_member_id: user.id
      });

    if (newProfileError) {
      console.log(newProfileError);
      return NextResponse.json(
        { message: "Error creating profile" },
        { status: 500 }
      );
    }

    const { error: emailInvitationError } = await resend.emails.send({
      from: "OCA Connect <team@oca.connect>",
      to: email,
      subject: `Welcome to OCA Connect, ${email}!`,
      react: InviteClubMember({
        email,
        role,
        club: club.name
      }),
      text: "",
    });

    if (emailInvitationError) {
      console.log(emailInvitationError);
      return NextResponse.json(
        { message: "Error sending email but profile was created" },
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
