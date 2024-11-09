import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full h-16 ">
      <div className="h-full max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          {/* Replace with your actual logo */}
          <span className="text-2xl font-bold text-white">OCA-Connect</span>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-white font-medium">Fahim Mahbub</div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  President
                </Badge>
              </div>
            </div>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-9 w-9 border-2 border-white/20">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
                  <AvatarFallback className="bg-white/10 text-white">FM</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
    </header>
  );
};

export default Header;