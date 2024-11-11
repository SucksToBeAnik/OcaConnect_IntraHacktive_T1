"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function DropdownLogout({ logoutAction }) {
  return (
    <DropdownMenuItem onClick={logoutAction} className="text-red-600">
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  );
}
