import HrDashboard from "@/components/dashboard/HrDashboard";
import { getClubProfilesGivenClubId } from "@/db-actions/club-profiles/server";
import { getAuthorizedUser } from "@/db-actions/auth.users/server";
import { getUserActiveClubProfile } from "@/db-actions/club-profiles/server";
import { getAllClubMembers } from "@/db-actions/club-members/server";
import FinanceDashboard from "@/components/dashboard/FinanceDashboard";
import EmptyContent from "@/components/root/EmptyContent";


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

  switch (role) {
    case "hr":
      pageContent = <HrDashboard clubMembers={clubMembers} eligibleMembersForInvite={eligibleMembersForInvite} clubId={activeClubProfile.data.club_id} />;
      break;
    case "finance":
      pageContent = <FinanceDashboard />;
      break;
    default:
      pageContent = <EmptyContent message="You are not authorized to access this page" />;
      break;
  }

  return <div>
    {pageContent}
  </div>;
}
