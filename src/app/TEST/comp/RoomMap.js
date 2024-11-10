'use client';

import React, { useState } from 'react';
import { Search, Calendar, Filter } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, parse } from "date-fns";

const RoomMap = () => {
  const [date, setDate] = useState(new Date());
  const [floor, setFloor] = useState("");
  const [zone, setZone] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    if (inputDate) {
      const parsedDate = parse(inputDate, 'yyyy-MM-dd', new Date());
      setDate(parsedDate);
    }
  };

  const formatDateForInput = (date) => {
    return format(date, 'yyyy-MM-dd');
  };

  const generateRoomData = (floor, zone) => {
    const rooms = [];
    const types = ['classroom', 'lab', 'others'];
    const statuses = ['available', 'booked', 'reserved'];
    
    const roomCount = Math.floor(Math.random() * 10) + 15;
    
    for (let i = 1; i <= roomCount; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const roomNumber = zone 
        ? `${floor}${zone}-${i}${type === 'lab' ? 'L' : 'C'}`
        : `${floor}-${i}${type === 'lab' ? 'L' : 'C'}`;
        
      rooms.push({
        id: i,
        roomNumber,
        type,
        capacity: Math.floor(Math.random() * 30) + 20,
        status,
        bookings: [
          {
            date: new Date(),
            timeSlots: ['9:00 AM - 10:30 AM', '2:00 PM - 3:30 PM']
          }
        ]
      });
    }
    return rooms;
  };

  const getStatusColor = (status) => {
    const colors = {
      available: 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700',
      booked: 'bg-red-600 text-white border-red-700 hover:bg-red-700',
      reserved: 'bg-amber-600 text-white border-amber-700 hover:bg-amber-700'
    };
    return colors[status] || 'bg-gray-600';
  };

  const getBadgeVariant = (status) => {
    const variants = {
      available: 'success',
      booked: 'destructive',
      reserved: 'warning'
    };
    return variants[status] || 'secondary';
  };

  const roomData = generateRoomData(floor || '1', zone);

  const filteredRooms = roomData.filter(room => {
    const matchesSearch = searchQuery 
      ? room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesSearch;
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Room Map</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>BRACU Room Booking Map</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              {/* Simplified Date Picker */}
              <div className="relative">
                <input
                  type="date"
                  value={formatDateForInput(date)}
                  onChange={handleDateChange}
                  className="w-[240px] px-3 py-2 border rounded-md"
                />
              </div>

              {/* Floor Selector */}
              <Select value={floor} onValueChange={setFloor}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Floor" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(12)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      Floor {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Zone Selector */}
              <Select value={zone} onValueChange={setZone}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Zone" />
                </SelectTrigger>
                <SelectContent>
                  {['A', 'B', 'C', 'D', 'E', 'F'].map((zone) => (
                    <SelectItem key={zone} value={zone}>
                      Zone {zone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by room number (e.g., 10A-12C)"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Room Grid */}
          <div className="grid grid-cols-5 gap-4 overflow-y-auto max-h-[50vh] p-4">
            {filteredRooms.map((room) => (
              <TooltipProvider key={room.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${getStatusColor(room.status)}`}
                    >
                      <div className="text-sm font-medium">{room.roomNumber}</div>
                      <Badge 
                        variant={getBadgeVariant(room.status)} 
                        className="mt-1"
                      >
                        {room.status}
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-2">
                      <div className="font-medium">Room Details</div>
                      <div className="text-sm">Type: {room.type}</div>
                      <div className="text-sm">Capacity: {room.capacity} people</div>
                      <div className="text-sm">
                        Bookings for {format(date, "PP")}:
                        <ul className="list-disc list-inside">
                          {room.bookings[0].timeSlots.map((slot, i) => (
                            <li key={i}>{slot}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          {/* Legend */}
          <div className="flex space-x-4 justify-end">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-emerald-600 border border-emerald-700 rounded" />
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-600 border border-red-700 rounded" />
              <span className="text-sm">Booked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-amber-600 border border-amber-700 rounded" />
              <span className="text-sm">Reserved</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomMap;