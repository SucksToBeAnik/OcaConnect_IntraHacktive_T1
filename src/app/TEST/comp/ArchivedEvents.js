'use client';

import React from 'react';
import { 
  Trophy, Calendar, DollarSign, Clock, Users, 
  Download, Eye, FileText, BarChart 
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import EventsChart from './EventsChart'; // Import the client component

const ArchivedEvents = () => {
    // Dummy data for statistics
    const stats = [
      { 
        title: "Total Events", 
        value: "156", 
        icon: Trophy, 
        change: "+12% from last year" 
      },
      { 
        title: "Average Budget", 
        value: "$2,450", 
        icon: DollarSign, 
        change: "+5% from last year" 
      },
      { 
        title: "Avg. Planning Time", 
        value: "45 days", 
        icon: Clock, 
        change: "-3 days from avg" 
      },
      { 
        title: "Total Attendance", 
        value: "12,400", 
        icon: Users, 
        change: "+18% growth" 
      }
    ];
  
    // Dummy data for monthly events chart
    const monthlyData = [
      { month: 'Jan', events: 12 },
      { month: 'Feb', events: 8 },
      { month: 'Mar', events: 15 },
      { month: 'Apr', events: 10 },
      { month: 'May', events: 14 },
      { month: 'Jun', events: 18 },
    ];
  
    // Dummy data for events list
    const events = [
      {
        id: 1,
        title: "Tech Summit 2024",
        description: "Annual technology conference featuring industry leaders",
        budget: 5000,
        attendance: 450,
        duration: "3 days",
        club: "Computer Club",
        status: "Completed",
        date: "2024-03-15"
      },
      {
        id: 2,
        title: "Robotics Workshop",
        description: "Hands-on workshop on building autonomous robots",
        budget: 2500,
        attendance: 120,
        duration: "2 days",
        club: "ROBU",
        status: "Completed",
        date: "2024-02-28"
      },
      {
        id: 3,
        title: "Cultural Night",
        description: "Annual cultural festival with performances",
        budget: 3500,
        attendance: 800,
        duration: "1 day",
        club: "Cultural Club",
        status: "Completed",
        date: "2024-02-10"
      },
      {
        id: 4,
        title: "Debate Competition",
        description: "Inter-university debate championship",
        budget: 1500,
        attendance: 200,
        duration: "2 days",
        club: "Debate Club",
        status: "Completed",
        date: "2024-01-25"
      },
      {
        id: 5,
        title: "Programming Contest",
        description: "Competitive programming challenge",
        budget: 2000,
        attendance: 150,
        duration: "1 day",
        club: "Computer Club",
        status: "Completed",
        date: "2024-01-15"
      }
    ];
  
    return (
      <div className="mt-2">
        {/* Statistics Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <stat.icon className="h-8 w-8 opacity-75" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
  
       {/* Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Monthly Events Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <EventsChart data={monthlyData} />
        </CardContent>
      </Card>

        {/* Events List Section */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Past Events</CardTitle>
          </CardHeader>
          <ScrollArea className="h-[400px]">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Event Details</TableHead>
                    <TableHead className="w-[20%]">Stats</TableHead>
                    <TableHead className="w-[20%]">Club</TableHead>
                    <TableHead className="w-[20%]">Documents</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {event.description}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{event.date}</Badge>
                            <Badge variant="outline">{event.duration}</Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>${event.budget.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{event.attendance.toLocaleString()}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{event.club}</Badge>
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <div className="flex gap-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="outline" size="icon">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Budget Form</TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="outline" size="icon">
                                  <BarChart className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Event Report</TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="outline" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View Details</TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    );
  };
  
  export default ArchivedEvents;