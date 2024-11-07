import { responseToReturn } from "@/lib/helpers";
import { createClient } from "@/utils/supabase/server";

export async function getAuthorizedUser() {
  const sb = createClient();
  try {
    const { data: authorizedUser, error: authorizedUserError } =
      await sb.auth.getUser();
    if (authorizedUserError) {
      throw new Error(
        `Error getting authorized user: ${authorizedUserError.message}`
      );
    }
    return responseToReturn(
      true,
      "Authorized user fetched successfully",
      authorizedUser
    );
  } catch (error) {
    if (error instanceof Error) {
      return responseToReturn(false, error.message, null);
    }
    return responseToReturn(false, "Internal server error", null);
  }
}
