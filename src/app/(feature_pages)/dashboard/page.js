import HrDashboard from "@/components/dashboard/HrDashboard";
import { getClubProfilesGivenClubId } from "@/db-actions/club-profiles/server";
import { getAuthorizedUser } from "@/db-actions/auth.users/server";
import { getUserActiveClubProfile } from "@/db-actions/club-profiles/server";
import { getAllClubMembers } from "@/db-actions/club-members/server";


export default async function Page() {
  const authorizedUser = await getAuthorizedUser();
  console.log(authorizedUser);
  const activeClubProfile = await getUserActiveClubProfile(authorizedUser.data.id);
  let clubMembers = [];
  let eligibleMembersForInvite = [];

  if (activeClubProfile.success) {
    const clubProfiles = await getClubProfilesGivenClubId(
      activeClubProfile.data.club_id
    );
    clubMembers = clubProfiles.data;
  }else{
    console.log(activeClubProfile.message);
  }
  const allClubMembers = await getAllClubMembers();
  eligibleMembersForInvite = allClubMembers.data;

  let pageContent;
  const role = activeClubProfile.data.role;
  if (role === "hr") {
    pageContent = <HrDashboard clubMembers={clubMembers} eligibleMembersForInvite={eligibleMembersForInvite} clubId={activeClubProfile.data.club_id} />;
  }

  return <div>{pageContent}</div>;
}
