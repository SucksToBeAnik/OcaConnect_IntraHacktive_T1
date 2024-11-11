"use client";

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  DollarSign,
  Building,
  Tv,
  Palette,
  MessageSquare,
  Coffee,
  Truck,
  Plus,
  BadgeDollarSign,
  Briefcase,
  FileText,
  AlertCircle,
  Clock,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  estimated_budget: z.coerce.number().min(0, "Budget must be greater than 0").optional(),
  venue_cost: z.coerce.number().min(0, "Venue cost cannot be negative").optional(),
  equipment_cost: z.coerce.number().min(0, "Equipment cost cannot be negative").optional(),
  decoration_cost: z.coerce.number().min(0, "Decoration cost cannot be negative").optional(),
  marketing_cost: z.coerce.number().min(0, "Marketing cost cannot be negative").optional(),
  refreshment_cost: z.coerce.number().min(0, "Refreshment cost cannot be negative").optional(),
  transportation_cost: z.coerce.number().min(0, "Transportation cost cannot be negative").optional(),
  other_cost: z.coerce.number().min(0, "Other costs cannot be negative").optional(),
  need_oca_budget: z.boolean().default(false).optional(),
  need_sponsor_budget: z.boolean().default(false).optional(),
  sponsor_names: z.string().optional(),
  note: z.string().optional(),
});

const BudgetForm = ({ event }) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      estimated_budget: event?.budget_forms?.estimated_budget || 0,
      venue_cost: event?.budget_forms?.venue_cost || 0,
      equipment_cost: event?.budget_forms?.equipment_cost || 0,
      decoration_cost: event?.budget_forms?.decoration_cost || 0,
      marketing_cost: event?.budget_forms?.marketing_cost || 0,
      refreshment_cost: event?.budget_forms?.refreshment_cost || 0,
      transportation_cost: event?.budget_forms?.transportation_cost || 0,
      other_cost: event?.budget_forms?.other_cost || 0,
      need_oca_budget: event?.budget_forms?.need_oca_budget || false,
      need_sponsor_budget: event?.budget_forms?.need_sponsor_budget || false,
      sponsor_names: event?.budget_forms?.sponsor_names || "",
      note: event?.budget_forms?.note || "",
    },
  });

  const onSubmit = async (data) => {
    const formSubmissionPromise = new Promise(async (resolve, reject) => {
      try {
        // Convert string values to numbers for numeric fields and filter out empty fields
        const numericFields = [
          'estimated_budget',
          'venue_cost',
          'equipment_cost',
          'decoration_cost',
          'marketing_cost',
          'refreshment_cost',
          'transportation_cost',
          'other_cost'
        ];

        const processedData = Object.fromEntries(
          Object.entries(data).map(([key, value]) => {
            if (numericFields.includes(key) && value !== '') {
              return [key, Number(value)];
            }
            return [key, value];
          })
        );

        // Filter out empty fields
        const filteredData = Object.fromEntries(
          Object.entries(processedData).filter(([_, value]) => {
            return value !== "" && value !== null && value !== undefined;
          })
        );

        const supabase = createClient();
        const { data: budgetFormData, error: budgetFormError } = await supabase
          .from("budget_forms")
          .update({
            ...filteredData,
            isApproved: true,
          })
          .eq("id", event.id);
          console.log(budgetFormData);
        if (budgetFormError) {
            console.log("Error submitting budget form:", budgetFormError);
            throw budgetFormError;
        }
        resolve("Budget form updated successfully");
      } catch (error) {
        console.log("Error submitting budget form:", error);
        reject(error);
      }
    });

    toast.promise(formSubmissionPromise, {
      loading: "Updating budget form...",
      success: () => {
        setTimeout(() => {
          router.refresh();
        }, 500);
        return "Budget form updated successfully";
      },
      error: "Failed to update budget form",
    });
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          <div className="flex items-center gap-2">
            <BadgeDollarSign className="h-6 w-6 text-foreground" />
            <div>
              <span className="font-bold text-lg">{event?.title}</span>
              <span className="">- Budget Form</span>
            </div>
          </div>
        </DialogTitle>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeDollarSign className="h-6 w-6 text-foreground" />
                Event Budget Form
              </CardTitle>
              <CardDescription>
                Please provide detailed budget information for the event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="estimated_budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Total Estimated Budget
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="venue_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Venue Cost
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="equipment_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Tv className="h-4 w-4" />
                        Equipment Cost
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="decoration_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Decoration Cost
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marketing_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Marketing Cost
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="refreshment_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Coffee className="h-4 w-4" />
                        Refreshment Cost
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="transportation_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        Transportation Cost
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
            
                  control={form.control}
                  name="other_cost"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Other Cost
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="need_oca_budget"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Need OCA Budget</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="need_sponsor_budget"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Need Sponsor Budget</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="sponsor_names"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Sponsor Names
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Note
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Approve Budget Form
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </DialogContent>
  );
};

export default BudgetForm;
