import SelectClub from "./SelectClub";
import { Bell, LogOut, User, Settings } from "lucide-react"; // For icons
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthorizedUser } from "@/db-actions/auth.users/server";
import { getUserActiveClubProfile, getAllClubProfilesGivenUserId } from "@/db-actions/club-profiles/server";
import { redirect } from "next/navigation";
import { getActiveClubMember } from "@/db-actions/club-members/server";
import { Badge } from "@/components/ui/badge";

export default async function Navbar() {
  let userClubProfiles = [];
  const authorizedUserData = await getAuthorizedUser();
  if (!authorizedUserData.success) {
    redirect("/login");
  }
  const userId = authorizedUserData.data.id;
  const clubMemberData = await getActiveClubMember(userId);
  if (!clubMemberData.success) {
    redirect("/login");
  }
  const userClubProfilesData = await getAllClubProfilesGivenUserId(clubMemberData.data.id);

  if (userClubProfilesData.success) {
    userClubProfiles = userClubProfilesData.data;
  }

  // Find the active club profile to get the role
  const activeClubProfile = userClubProfiles.find(
    profile => profile.id === clubMemberData.data.active_club_profile
  );
  const userRole = activeClubProfile?.role || 'N/A';
  const userName = clubMemberData.data.name || 'N/A';

  return (
    <nav className="w-full shadow-md shadow-gray-900 p-6 rounded-b-lg">
      <div className="flex items-center justify-between">
        {/* Left section: Logo and Club Select */}
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold">
            <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-200 bg-clip-text text-transparent text-2xl font-black">
              OCA
            </span>
            connect
          </div>

          <SelectClub clubProfiles={userClubProfiles} userId={clubMemberData.data.id} activeClubProfileId={clubMemberData.data.active_club_profile} />
        </div>

        {/* Right section: Navigation Links and Icons */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <Link href="/events" className="hover:text-primary">
              Events
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="hover:text-primary">
              <Bell size={20} />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="/placeholder-avatar.jpg"
                    alt="User avatar"
                  />
                  <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex justify-between items-start">
                    <p>{userName}</p>
                    <Badge variant="outline" className="text-sm">{userRole}</Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
