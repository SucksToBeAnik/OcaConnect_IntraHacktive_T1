import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, LogOut } from "lucide-react"; // For icons
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left section: Logo and Club Select */}
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold">
            LOGO
          </div>
          
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Club" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="club1">Club 1</SelectItem>
              <SelectItem value="club2">Club 2</SelectItem>
              <SelectItem value="club3">Club 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right section: Navigation Links and Icons */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
            <Link href="/events" className="hover:text-primary">Events</Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="hover:text-primary">
              <Bell size={20} />
            </button>
            <button className="hover:text-primary">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
