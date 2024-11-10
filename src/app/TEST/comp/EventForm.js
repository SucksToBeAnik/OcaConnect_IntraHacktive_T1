import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Mic2,
  LayoutTemplate,
  Target,
  Shield,
  Phone,
  Upload,
  User,
  FileText,
  Fullscreen,
} from "lucide-react";

const EventForm = () => {
  return (
    <Card className="border-0 shadow-none h-[calc(100vh-400px)] overflow-y-auto p-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-foreground" />
              Event Form - Department of Events
            </CardTitle>
            <CardDescription>
              Please fill in all the necessary details for your event report
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Event Information */}
            {/* Basic Event Information */}
          <div>
            <Label htmlFor="title" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Event Title
            </Label>
            <Input id="title" placeholder="Enter event title" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="description" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Description
            </Label>
            <Textarea 
              id="description" 
              placeholder="Provide a brief summary of the event"
              className="mt-1"
            />
          </div>

          {/* Date and Time Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Event Date
              </Label>
              <Input 
                id="date" 
                type="date" 
                className="mt-1"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Event Time
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" placeholder="Start Time" />
                <Input type="time" placeholder="End Time" />
              </div>
            </div>
          </div>

          {/* Location and Audience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location/Venue
              </Label>
              <Input id="location" placeholder="Enter venue details" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="audience" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Expected Audience Size
              </Label>
              <Input 
                id="audience" 
                type="number" 
                placeholder="Enter expected number of attendees"
                className="mt-1"
              />
            </div>
          </div>

          {/* Requirements Section */}
          <Card className="border border-muted">
            <CardHeader>
              <CardTitle className="text-lg">Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="technical" className="flex items-center gap-2">
                  <Mic2 className="h-4 w-4" />
                  Technical Needs
                </Label>
                <Textarea 
                  id="technical" 
                  placeholder="List required equipment (microphones, projectors, etc.)"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="setup" className="flex items-center gap-2">
                  <LayoutTemplate className="h-4 w-4" />
                  Physical Setup
                </Label>
                <Textarea 
                  id="setup" 
                  placeholder="Describe room arrangement and setup preferences"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Objectives and Permissions */}
          <div>
            <Label htmlFor="objectives" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Event Objectives
            </Label>
            <Textarea 
              id="objectives" 
              placeholder="List primary goals and expected outcomes"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="permissions" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Special Permissions Needed
            </Label>
            <Textarea 
              id="permissions" 
              placeholder="List any additional approvals required"
              className="mt-1"
            />
          </div>

          {/* Organizer Contact */}
          <Card className="border border-muted">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-4 w-4" />
                Organizer Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="organizerName">Name</Label>
                  <Input id="organizerName" placeholder="Enter organizer's name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="organizerPhone">Phone</Label>
                  <Input id="organizerPhone" placeholder="Enter phone number" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="organizerEmail">Email</Label>
                <Input id="organizerEmail" type="email" placeholder="Enter email address" className="mt-1" />
              </div>
            </CardContent>
          </Card>

          {/* Attachments */}
          <div>
            <Label htmlFor="attachments" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Attachments
            </Label>
            <Input 
              id="attachments" 
              type="file" 
              multiple 
              className="mt-1 cursor-pointer" 
            />
            <p className="text-sm text-muted-foreground mt-1">
              Upload supporting documents (venue layouts, vendor quotes, etc.)
            </p>
          </div>

          {/* Submission Date Display */}
          <div className="text-sm text-muted-foreground">
            Submission Date: {new Date().toLocaleDateString()}
          </div>

            {/* Previous fields remain the same... */}
            {/* Adding new Additional Comments section */}
            <div>
              <Label htmlFor="additionalComments" className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-foreground" />
                Additional Comments/Information
              </Label>
              <Textarea 
                id="additionalComments" 
                placeholder="Add any additional information, relevant URLs, or supplementary details about the event"
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                You can include any extra details that don't fit in other categories, such as relevant links, 
                special considerations, or additional context that would be helpful for the review panel.
              </p>
            </div>
          </CardContent>
        </Card>
  );
};

export default EventForm;