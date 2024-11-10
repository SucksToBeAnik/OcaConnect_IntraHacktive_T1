"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function SelectClub({
  clubProfiles,
  activeClubProfileId,
  userId,
}) {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  console.log("clubProfiles----", clubProfiles);
  const activeClub = clubProfiles?.find(
    (clubProfile) => clubProfile.id === activeClubProfileId
  );

  async function handleClubChange(clubProfileId) {
    // toast.loading("Switching club...");
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("club_members")
        .update({ active_club_profile: clubProfileId })
        .eq("id", userId);

      if (error){
        throw new Error("Failed to update active club");
      } else {
        router.refresh();
        toast.success("Club switched successfully!");
      }
    } catch (error) {
      toast.error("Failed to update active club");
      console.error(error);
    } finally {
      toast.dismiss();
      setIsLoading(false);
    }
  }

  return (
    <Select
      disabled={isLoading}
      value={activeClubProfileId ?? null}
      onValueChange={handleClubChange}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="No selected club">
          {activeClub?.clubs && (
            <div className="flex items-center gap-2">
              <span>{activeClub.clubs.name}</span>
              <Badge variant="secondary" className="ml-2">
                {activeClub.role}
              </Badge>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {clubProfiles?.length ? (
          clubProfiles.map((clubProfile) => (
            <SelectItem key={clubProfile.id} value={clubProfile.id}>
              <div className="flex items-center justify-between w-full">
                <p>{clubProfile?.clubs?.name || "No club"}</p>
                <Badge variant="secondary" className="ml-2">
                  {clubProfile.role}
                </Badge>
              </div>
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-clubs" disabled>
            No available clubs
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
