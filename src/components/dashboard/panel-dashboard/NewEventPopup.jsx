"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, FileText, Info, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  guidelines: z.string().min(5, "Guidelines must be at least 5 characters"),
});

const NewEventPopup = ({ clubId }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      guidelines: "",
    },
  });

  const onSubmit = async (data) => {
    const formSubmissionPromise = new Promise(async (resolve, reject) => {
      const eventData = {
        ...data,
        club_id: clubId,
      };
      const sb = createClient();
      try {
        const { data, error } = await sb
          .from("events")
          .insert(eventData)
          .select()
          .single();
        if (error) throw error;
        const { data: budgetFormData, error: budgetFormError } = await sb
          .from("budget_forms")
          .insert({
            id: data.id,
          });
        const { data: eventFormData, error: eventFormError } = await sb
          .from("event_forms")
          .insert({
            id: data.id,
          });
        if (budgetFormError || eventFormError)
          throw budgetFormError || eventFormError;
        resolve("Event created successfully");
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(formSubmissionPromise, {
      loading: "Creating event...",
      success: () => {
        setTimeout(() => {
          router.refresh();
        }, 500);
        setOpen(false);
        return "Event created successfully";
      },
      error: "Failed to create event",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Event Title
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter event description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guidelines"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Guidelines
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter event guidelines" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewEventPopup;
