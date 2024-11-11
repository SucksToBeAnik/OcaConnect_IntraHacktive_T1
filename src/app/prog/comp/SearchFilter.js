"use client"
import React, { useState } from 'react';
import { Search, Filter, Calendar, X, ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const SearchFilter = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  
  const clubs = [
    "Computer Club",
    "ROBU",
    "IEEE",
    "Cultural Club",
    "Sports Club"
  ];

  const dateFilters = [
    "Today",
    "This Week",
    "This Month",
    "Upcoming"
  ];

  const addFilter = (filter) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
          <Input 
            placeholder="Search events..." 
            className="pl-10"
          />
        </div>

        <Select>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Select Club" />
          </SelectTrigger>
          <SelectContent>
            {clubs.map((club) => (
              <SelectItem 
                key={club} 
                value={club.toLowerCase()}
                onClick={() => addFilter(club)}
              >
                {club}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Calendar className="h-4 w-4" />
              Date
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dateFilters.map((filter) => (
              <DropdownMenuItem 
                key={filter}
                onClick={() => addFilter(filter)}
              >
                {filter}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge 
              key={filter} 
              variant="secondary"
              className="flex items-center gap-1"
            >
              {filter}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => removeFilter(filter)}
              />
            </Badge>
          ))}
          {activeFilters.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setActiveFilters([])}
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;