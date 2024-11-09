import { createClient } from "@/utils/supabase/server";
import { responseToReturn } from "@/lib/helpers";

/**
 * Get the active club profile for a user
 * @param {string} userId
 * @returns {object}
 */
export async function getUserActiveClubProfile(userId) {
    console.log(userId)
  const supabase = createClient();
  const { data: clubMemberData, error: clubMemberError } = await supabase
    .from("club_members")
    .select("*")
    .eq("id", userId)
    .single();
  if (clubMemberError) {
    return responseToReturn(false, "Error fetching club member", null);
  }

  if (!clubMemberData.active_club_profile) {
    return responseToReturn(false, "User has no active club profile", null);
  }

  const { data: clubProfileData, error: clubProfileError } = await supabase
    .from("club_profiles")
    .select("*")
    .eq("id", clubMemberData.active_club_profile)
    .single();
  if (clubProfileError) {
    return responseToReturn(false, "Error fetching club profile", null);
  }

  return responseToReturn(true, "Club profile fetched", clubProfileData);
}

/**
 * Get all the club profiles for a given club
 * @param {string} clubId
 * @returns {object}
 */
export async function getClubProfilesGivenClubId(clubId) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("club_profiles")
    .select("role,club_members:club_member_id(name, email)")
    .eq("club_id", clubId);


  if (error) {
    console.log(error);
    return responseToReturn(false, "Error fetching club profiles", null);
  }
  

  return responseToReturn(true, "Club profiles fetched", data);
}
