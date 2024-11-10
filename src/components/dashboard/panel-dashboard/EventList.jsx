import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  ChevronDown,
  Users,
  Building2,
  Timer,
  Check,
  X,
} from 'lucide-react';

const StatusBadge = ({ status }) => {
  const statusConfigs = {
    5: {
      icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
      label: "Completed",
      className: "bg-green-600 hover:bg-green-600 text-white",
    },
    0: {
      icon: <AlertCircle className="h-4 w-4 mr-1" />,
      label: "Stage 0",
      className: "bg-red-600 hover:bg-red-600 text-white",
    },
    1: {
      icon: <Clock className="h-4 w-4 mr-1" />,
      label: "Stage 1",
      className: "bg-yellow-600 hover:bg-yellow-600 text-white",
    },
    2: {
      icon: <Users className="h-4 w-4 mr-1" />,
      label: "Stage 2",
      className: "bg-yellow-600 hover:bg-yellow-600 text-white",
    },
    3: {
      icon: <Building2 className="h-4 w-4 mr-1" />,
      label: "Stage 3",
      className: "bg-orange-600 hover:bg-orange-600 text-white",
    },
    4: {
      icon: <Timer className="h-4 w-4 mr-1" />,
      label: "Stage 4",
      className: "bg-blue-600 hover:bg-blue-600 text-white",
    },
  };

  const config = statusConfigs[status];

  return (
    <Badge className={`flex items-center ${config.className}`}>
      {config.icon}
      {config.label}
    </Badge>
  );
};

const FormStatusButton = ({ title, icon, isComplete }) => (
  <Button 
    variant="outline" 
    size="sm"
    className={`flex items-center gap-2 w-full ${
      isComplete 
        ? 'bg-green-600 hover:bg-green-800 ' 
        : 'bg-red-600 hover:bg-red-800 '
    }`}
  >
    {icon}
    {title}
    {isComplete 
      ? <Check className="h-4 w-4 ml-auto text-white font-bold" /> 
      : <X className="h-4 w-4 ml-auto text-white font-bold" />
    }
  </Button>
);

const EventCard = ({ event }) => {
  return (
    <Collapsible className="w-full border rounded-lg mb-3">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{event.title}</h3>
          <StatusBadge status={event.status} />
        </div>
        
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
            <ChevronDown className="h-4 w-4" />
            View Details
          </div>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        <div className="p-4 pt-2 border-t">
          <div className="space-y-4 flex">
            {/* Form Status Buttons */}
            <div className="flex justify-between items-center gap-2">
              <FormStatusButton 
                title="Budget Form"
                icon={<DollarSign className="h-4 w-4" />}
                isComplete={event?.budget_forms?.isApproved}
              />
              <FormStatusButton 
                title="Event Form"
                icon={<FileText className="h-4 w-4" />}
                isComplete={event?.event_forms?.isApproved}
              />
            </div>

            {/* Additional Info */}
            {/* <div className="text-sm text-muted-foreground ml-10">
              <p>Event Date: {event.date}</p>
              <p>Last Updated: {event.lastUpdated}</p>
            </div> */}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const EventList = ({ events }) => {
//   const events = [
//     {
//       title: "Orientation 2024",
//       status: "completed",
//       date: "2024-03-15",
//       lastUpdated: "2024-03-16",
//       budgetForm: true,
//       eventForm: true,
//     },
//     {
//       title: "Prize Giving Ceremony",
//       status: "stage3",
//       date: "2024-04-20",
//       lastUpdated: "2024-03-10",
//       budgetForm: true,
//       eventForm: true,
//     },
//     {
//       title: "General Body Meeting",
//       status: "stage1",
//       date: "2024-04-01",
//       lastUpdated: "2024-03-08",
//       budgetForm: true,
//       eventForm: false,
//     },
//     {
//       title: "Cultural Night",
//       status: "stage0",
//       date: "2024-05-15",
//       lastUpdated: "2024-03-05",
//       budgetForm: false,
//       eventForm: false,
//     },
//     {
//       title: "Sports Week",
//       status: "stage4",
//       date: "2024-04-10",
//       lastUpdated: "2024-03-01",
//       budgetForm: true,
//       eventForm: true,
//     },
//   ];

  return (
    <Card>
      <CardContent className="p-4">
        <ScrollArea className="h-[calc(100vh-320px)]">
          <div className="space-y-1">
            {events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EventList;