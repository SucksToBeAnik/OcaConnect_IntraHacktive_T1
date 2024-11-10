"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { DialogHeader } from "@/components/ui/dialog";

// Define the validation schema with optional fields
const formSchema = z.object({
  event_date: z.string().optional(),
  event_start_time: z.string().optional(),
  event_end_time: z.string().optional(),
  location: z.string().optional(),
  audience: z.number().min(0).optional(),
  technical_needs: z.string().optional(),
  physical_setup: z.string().optional(),
  objectives: z.string().optional(),
  special_permissions: z.string().optional(),
  organizer_name: z.string().optional(),
  organizer_phone: z.string().optional(),
  organizer_email: z.string().optional(),
  additional_comments: z.string().optional(),
});

const EventForm = ({ event, isApproved }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event_date: event?.event_forms?.event_date || "",
      event_start_time: event?.event_forms?.event_start_time || "",
      event_end_time: event?.event_forms?.event_end_time || "",
      location: event?.event_forms?.location || "",
      audience: event?.event_forms?.audience ? Number(event?.event_forms?.audience) : 0,
      technical_needs: event?.event_forms?.technical_needs || "",
      physical_setup: event?.event_forms?.physical_setup || "",
      objectives: event?.event_forms?.objectives || "",
      special_permissions: event?.event_forms?.special_permissions || "",
      organizer_name: event?.event_forms?.organizer_name || "",
      organizer_phone: event?.event_forms?.organizer_phone || "",
      organizer_email: event?.event_forms?.organizer_email || "",
      additional_comments: event?.event_forms?.additional_comments || "",
    },
  });

  const onSubmit = async (data) => {
    const formSubmissionPromise = new Promise(async (resolve, reject) => {
      try {
        // Filter out empty fields
        const filteredData = Object.fromEntries(
          Object.entries(data).filter(([_, value]) => {
            // Keep numbers (including 0) and non-empty strings
            return value !== "" && value !== null && value !== undefined;
          })
        );

        // Handle form submission
        const supabase = createClient();
        const { data: eventFormData, error: eventFormError } = await supabase
          .from("event_forms")
          .update({
            ...filteredData,
            isApproved: isApproved,
          })
          .eq("id", event.id);
        if (eventFormError) throw eventFormError;
        resolve("Event form submitted successfully");
      } catch (error) {
        console.log("Error submitting event form:", error);
        reject(error);
      }
    });
    toast.promise(formSubmissionPromise, {
      loading: "Updating event form...",
      success: "Event form updated successfully",
      error: "Failed to update event form",
    });
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-foreground" />
            <div>
              <span className="font-bold text-lg">{event?.title}</span>
              <span className="">-{" "}Event Form</span>
            </div>
          </div>
        </DialogTitle>
      </DialogHeader>
      <Card className="border-0 shadow-none">
        <CardHeader>
          {/* <CardTitle className="flex items-center gap-2">
            
          </CardTitle> */}
          <CardDescription>
            Please fill in all the necessary details for your event report
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date and Time Section */}
                <FormField
                  control={form.control}
                  name="event_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="event_start_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Start Time
                        </FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="event_end_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          End Time
                        </FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Location and Audience */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter event location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Expected Audience Size
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter expected audience size"
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => {
                            const value = e.target.value === '' ? 0 : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Technical and Setup */}
                <FormField
                  control={form.control}
                  name="technical_needs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mic2 className="h-4 w-4" />
                        Technical Requirements
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any technical requirements"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="physical_setup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <LayoutTemplate className="h-4 w-4" />
                        Setup Details
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the setup requirements"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Objectives and Permissions */}
                <FormField
                  control={form.control}
                  name="objectives"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Event Objectives
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the event objectives"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="special_permissions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Required Permissions
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List required permissions"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Organizer Information */}
                <FormField
                  control={form.control}
                  name="organizer_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Organizer Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter organizer's name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organizer_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Contact Number
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organizer_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Additional Comments */}
                <FormField
                  control={form.control}
                  name="additional_comments"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="flex items-center gap-2">
                        <Fullscreen className="h-4 w-4" />
                        Additional Comments
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional comments or requirements"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Update Event Form
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </DialogContent>
  );
};

export default EventForm;
