import React from 'react';
import {
  Calendar,
  ClipboardCheck,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Users,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sampleEvents = [
  {
    id: "EVT-2024-001",
    title: "Tech Workshop 2024",
    description: "A hands-on workshop on emerging technologies and their applications in modern software development.",
    stage: 2,
    eventForm: true,
    budgetForm: true,
    date: "2024-04-15",
    club: "Computer Club"
  },
  {
    id: "EVT-2024-002",
    title: "Robotics Exhibition",
    description: "Annual robotics exhibition showcasing student projects and innovations in robotics.",
    stage: 4,
    eventForm: true,
    budgetForm: true,
    date: "2024-04-20",
    club: "ROBU"
  }
];

const stages = [
  { label: "Initial", icon: Clock },
  { label: "Forms", icon: FileText },
  { label: "Panel", icon: Users },
  { label: "OCA", icon: AlertCircle },
  { label: "Ready", icon: CheckCircle2 },
  { label: "Complete", icon: Trophy }
];

const EventCard = ({ event }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-2xl font-semibold">{event.title}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{event.id}</Badge>
              <Badge>{event.club}</Badge>
              <Badge variant="secondary">
                <Calendar className="w-3 h-3 mr-1" />
                {event.date}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm">{event.description}</p>

        {/* Forms Status */}
        <div className="flex gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant={event.eventForm ? "success" : "destructive"}>
                  <FileText className="w-3 h-3 mr-1" />
                  Event Form
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                {event.eventForm ? "Approved" : "Pending"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant={event.budgetForm ? "success" : "destructive"}>
                  <ClipboardCheck className="w-3 h-3 mr-1" />
                  Budget Form
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                {event.budgetForm ? "Approved" : "Pending"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Progress Visualization */}
        <div className="relative py-8">
          {/* Base Progress Track */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-muted rounded-full -translate-y-1/2" />
          
          {/* Active Progress Track with Glow */}
          <div 
            className="absolute top-1/2 left-0 h-1 bg-primary rounded-full -translate-y-1/2 transition-all duration-500"
            style={{ 
              width: `${(event.stage / (stages.length - 1)) * 100}%`,
              boxShadow: '0 0 10px var(--primary)'
            }}
          />

          {/* Stage Icons Container */}
          <div className="relative flex justify-between">
            {stages.map((stage, index) => {
              const StageIcon = stage.icon;
              const isCompleted = index <= event.stage;
              const isCurrent = index === event.stage;
              
              return (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex flex-col items-center">
                        {/* Animated Connection Line */}
                        {index < stages.length - 1 && (
                          <div 
                            className={`absolute top-1/2 h-0.5 -translate-y-1/2
                              ${isCompleted ? 'bg-primary' : 'bg-muted'}`}
                            style={{ 
                              left: `${(index + 1) * (100 / (stages.length - 1))}%`,
                              width: `${100 / (stages.length - 1)}%`,
                              transform: 'translateX(-50%)',
                              transition: 'background-color 0.5s ease'
                            }}
                          />
                        )}

                        {/* Icon Container with Glow Effect */}
                        <div 
                          className={`
                            relative z-10
                            w-10 h-10 rounded-full 
                            flex items-center justify-center 
                            transition-all duration-300 ease-in-out
                            ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted'}
                            ${isCurrent ? 'ring-4 ring-primary ring-opacity-50' : ''}
                            ${isCompleted ? 'shadow-lg' : ''}
                          `}
                          style={{
                            boxShadow: isCompleted ? '0 0 15px var(--primary)' : 'none',
                          }}
                        >
                          <StageIcon className="w-5 h-5" />
                        </div>

                        {/* Stage Label */}
                        <span className={`
                          mt-2 text-xs font-medium
                          ${isCompleted ? 'text-primary' : 'text-muted-foreground'}
                          ${isCurrent ? 'font-semibold' : ''}
                        `}>
                          {stage.label}
                        </span>

                        {/* Current Stage Indicator */}
                        {isCurrent && (
                          <div className="mt-1 text-[10px] text-primary">
                            Current
                          </div>
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{`Stage ${index}: ${stage.label}`}</p>
                      {isCurrent && <p className="text-xs">Currently Active</p>}
                      {isCompleted && !isCurrent && <p className="text-xs">Completed</p>}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-end space-x-2">
        <Button variant="outline" size="sm">
          View Details
        </Button>
        <Button size="sm">
          Track Progress
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const EventProgList = () => {
  return (
    <div className="space-y-4 p-4">
      {sampleEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventProgList;