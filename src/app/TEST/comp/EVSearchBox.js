import React from 'react';
import { Search, Calendar, Users } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const EVSearchBox = () => {
  const clubs = [
    { id: 'bucc', name: 'Computer Club (BUCC)' },
    { id: 'robu', name: 'Robotics Club (ROBU)' },
    { id: 'cultural', name: 'Cultural Club' },
    { id: 'sports', name: 'Sports Club' },
    { id: 'debate', name: 'Debate Club' }
  ];

  const sortOptions = [
    { id: 'newest', name: 'Newest First' },
    { id: 'oldest', name: 'Oldest First' },
    { id: 'upcoming', name: 'Upcoming Events' },
    { id: 'past', name: 'Past Events' }
  ];

  return (
    <Card className="w-full max-w-3xl">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4" />
            <Input
              placeholder="Search events..."
              className="pl-10"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Club Filter */}
            <div className="flex-1">
              <Select>
                <SelectTrigger className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select Club" />
                </SelectTrigger>
                <SelectContent>
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={club.id}>
                      {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Sort */}
            <div className="flex-1">
              <Select>
                <SelectTrigger className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by Date" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EVSearchBox;