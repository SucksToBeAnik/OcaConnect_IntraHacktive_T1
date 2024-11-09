"use client";

import ClubMembersDataTable from "./ClubMembersDataTable";
import { clubMembersColumns } from "./ClubMembersColumn";
import { Button } from "@/components/ui/button";
import { UserPlus, Mail, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SearchToInviteCombobox } from "./SearchToInviteCombobox";
import { toast } from "sonner";

export default function HrDashboard({ clubMembers, eligibleMembersForInvite, clubId }) {
  const [showPendingInvites, setShowPendingInvites] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isSendingInvitation, setIsSendingInvitation] = useState(false);

  async function handleSendInvitation() {
    if (!selectedMember || !selectedRole) {
      toast.error("Please select a member and a role");
      return;
    }
    
    const loadingToast = toast.loading("Sending invitation...");
    setIsSendingInvitation(true);
    
    try {
      const response = await fetch("/api/invite-club-member", {
        method: "POST",
        body: JSON.stringify({ email: selectedMember.email, role: selectedRole, club_id: clubId }),
      });
      const data = await response.json();
      
      toast.dismiss(loadingToast);
      if (response.ok) {
        toast.success("Invitation sent successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to send invitation");
    } finally {
      setIsSendingInvitation(false);
    }
  }
  const pendingInvites = [
    { email: "aljami.islam.anik@g.bracu.ac.bd", message: "Please accept the invitation senpai" },
    { email: "mustafis.ahsan@g.bracu.ac.bd", message: "I want to join the club" },
  ];

  return (
    <div>
      <h1 className="text-4xl mb-6 text-center font-bold bg-gradient-to-r from-pink-800 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
        HR Dashboard
      </h1>

      <div className="flex flex-row justify-between items-center gap-4 mb-6">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowInviteForm(true)}
        >
          <UserPlus className="h-4 w-4" />
          Invite Member
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowPendingInvites(true)}
        >
          <Mail className="h-4 w-4" />
          Pending Invites
          <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
            {pendingInvites.length}
          </span>
        </Button>
      </div>

      <Dialog open={showInviteForm} onOpenChange={setShowInviteForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite New Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2 flex flex-col">
              <label htmlFor="email">Email</label>
              <SearchToInviteCombobox
                eligibleMembersForInvite={eligibleMembersForInvite}
                setSelectedMember={setSelectedMember}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role">Role</label>
              <Select
                value={selectedRole}
                onValueChange={(value) => setSelectedRole(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="panel">Panel</SelectItem>
                  <SelectItem value="director">Director</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={handleSendInvitation}>
              Send Invitation
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPendingInvites} onOpenChange={setShowPendingInvites}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pending Invites</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {pendingInvites.map((invite, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{invite.email}</p>
                  <p className="text-sm text-muted-foreground">
                    {invite.message}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-green-600"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-red-600">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button className="w-full">Approve All</Button>
          </div>
        </DialogContent>
      </Dialog>

      <ClubMembersDataTable columns={clubMembersColumns} data={clubMembers} />
    </div>
  );
}
