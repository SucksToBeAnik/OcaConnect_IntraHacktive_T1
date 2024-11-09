import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, FileText, Info, Calendar, Building2, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const NewEventPopup = () => {
  const eventId = `EVT-${Math.floor(100000 + Math.random() * 900000)}`; // Generate a random 6-digit event ID



  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className="mt-1 mb-2 bg-gradient-to-r w-40 p-4 h-11 from-purple-200 via-violet-400 to-indigo-600 font-semibold">
            Create a New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Create New Event
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-6">
          {/* Event ID Display */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span className="text-sm">Auto-assigned Event ID: <strong>{eventId}</strong></span>
              </div>
            </CardContent>
          </Card>

          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Event Title
            </Label>
            <Input id="title" placeholder="Enter event title" />
          </div>

          {/* Brief Details */}
          <div className="space-y-2">
            <Label htmlFor="details" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Brief Details
            </Label>
            <Textarea id="details" placeholder="Enter event details" />
          </div>

          {/* Budget Guidelines */}
          <div className="space-y-2">
            <Label htmlFor="budget" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Guidelines for Budget
            </Label>
            <Textarea id="budget" placeholder="Enter budget guidelines" />
          </div>

          {/* Budget Attachment */}
          <div className="space-y-2">
            <Label htmlFor="budgetFile" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Budget Attachment (Optional)
            </Label>
            <Input id="budgetFile" type="file" className="cursor-pointer" />
          </div>

          {/* Event Department Guidelines */}
          <div className="space-y-2">
            <Label htmlFor="deptGuidelines" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Guidelines for Event-Dept
            </Label>
            <Textarea id="deptGuidelines" placeholder="Enter department guidelines" />
          </div>

          {/* Department Attachment */}
          <div className="space-y-2">
            <Label htmlFor="deptFile" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Event-Dept Attachment (Optional)
            </Label>
            <Input id="deptFile" type="file" className="cursor-pointer" />
          </div>

          <p className="mt-8 text-gray-500 text-sm">
            Upon creating an event, both the <span className="font-semibold underline">Event-Form</span> and <span className="font-semibold underline">Budget-Form</span> will be generated and sent to the respective departments for further action.
            </p>


          {/* Submit Button */}
          <Button type="submit" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Confirm Creation of Event
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewEventPopup;