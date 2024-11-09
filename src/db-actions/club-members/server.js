import { responseToReturn } from "@/lib/helpers";
import { createClient } from "@/utils/supabase/server";

/**
 * Get the active club member for a given user
 * @param {string} userId
 * @returns {object}
 */
export async function getActiveClubMember(userId) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("club_members")
    .select("*")
    .eq("id", userId);
  if (error) {
    return responseToReturn(false, "Error fetching club member", null);
  }

  return responseToReturn(true, "Club member fetched", data);
}

/**
 * Get all the club members
 * @returns {object}
 */
export async function getAllClubMembers() {
  const supabase = createClient();
  const { data, error } = await supabase.from("club_members").select("*");
  if (error) {
    return responseToReturn(false, "Error fetching club members", null);
  }

  return responseToReturn(true, "Club members fetched", data);
}
