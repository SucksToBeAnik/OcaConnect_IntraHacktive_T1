import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  CheckCircle,
  RotateCcw,
  ChevronDown,
  Fullscreen,
} from "lucide-react";
import EventForm from "./EventForm";
import BudgetForm from "./BudgetForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormActions = ({ formType, eventId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleApprove = async () => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      const { data: budgetFormApproved, error: budgetFormApprovedError } =
        await supabase
          .from("budget_forms")
          .select("isApproved")
          .eq("id", eventId)
          .maybeSingle();

      const { data: eventFormApproved, error: eventFormApprovedError } =
        await supabase
          .from("event_forms")
          .select("isApproved")
          .eq("id", eventId)
          .maybeSingle();

      const { data: eventStatus, error: eventStatusError } = await supabase
        .from("events")
        .select("status")
        .eq("id", eventId)
        .maybeSingle();

      if (
        eventStatus.status !== 1 ||
        !budgetFormApproved.isApproved ||
        !eventFormApproved.isApproved
      ) {
        toast.error(
          "Event cannot be approved yet. Awaiting approval from finance and event manager"
        );
        return;
      } else {
        const { data: eventStatusUpdated, error: eventStatusUpdatedError } =
          await supabase.from("events").update({ status: 2 }).eq("id", eventId);
        if (eventStatusUpdatedError) {
          console.log("Error approving event:", eventStatusUpdatedError);
          toast.error("Failed to approve event");
        }
      }
      setTimeout(() => {
        router.refresh();
      }, 500);
      toast.success(
        `${formType === "budget" ? "Budget" : "Event"} approved successfully`
      );
    } catch (error) {
      console.error("Error approving:", error);
      toast.error(`Failed to approve ${formType}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskForReview = async () => {
    const supabase = createClient();
    setIsLoading(true);

    try {
      const { data: eventStatus, error: eventStatusError } = await supabase
        .from("events")
        .select("status")
        .eq("id", eventId)
        .maybeSingle();
      if (eventStatus.status === 4 || eventStatus.status === 5) {
        toast.error("Event cannot be reviewed anymore");
        return;
      }
      const { data: eventStatusUpdated, error: eventStatusUpdatedError } =
        await supabase.from("events").update({ status: 1 }).eq("id", eventId);
      if (eventStatusUpdatedError) {
        console.log(
          "Error requesting review for event:",
          eventStatusUpdatedError
        );
        toast.error("Failed to request review for event");
      }
      if (formType === "budget") {
        const { data: budgetForm, error: budgetFormError } = await supabase
          .from("budget_forms")
          .update({ isApproved: false })
          .eq("id", eventId);
        if (budgetFormError) {
          console.log("Error requesting review for budget:", budgetFormError);
          toast.error("Failed to request review for budget");
        }
      } else {
        const { data: eventForm, error: eventFormError } = await supabase
          .from("event_forms")
          .update({ isApproved: false })
          .eq("id", eventId);
        if (eventFormError) {
          console.log("Error requesting review for event:", eventFormError);
          toast.error("Failed to request review for event");
        }
      }
      router.refresh();
      toast.success("Review requested successfully");
    } catch (error) {
      console.error("Error requesting review:", error);
      toast.error("Failed to request review");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex gap-1">
        {formType === "budget" ? (
          <>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 flex items-center gap-2"
              onClick={handleApprove}
              disabled={isLoading}
            >
              <CheckCircle className="h-4 w-4" /> Approve Budget
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 flex items-center gap-2"
              onClick={handleAskForReview}
              disabled={isLoading}
            >
              <RotateCcw className="h-4 w-4" /> Ask for Review
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 flex items-center gap-2"
              onClick={handleApprove}
              disabled={isLoading}
            >
              <CheckCircle className="h-4 w-4" /> Approve Event
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 flex items-center gap-2"
              onClick={handleAskForReview}
              disabled={isLoading}
            >
              <RotateCcw className="h-4 w-4" /> Ask for Review
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default function EventPendingReview({ pendingEvents }) {
  const router = useRouter();
  const sendToOCA = async (eventId) => {
    console.log("Sending to OCA:", eventId);
    const supabase = createClient();
    const { data: eventStatus, error: eventStatusError } = await supabase
      .from("events")
      .select("status")
      .eq("id", eventId)
      .maybeSingle();
    if (eventStatusError) {
      console.log("Error getting event status:", eventStatusError);
      toast.error("Failed to get event status");
    }
    if (eventStatus.status !== 3) {
      toast.error("Event is not ready to be sent to OCA");
      return;
    }

    const { data: event, error: eventError } = await supabase
      .from("events")
      .update({ status: 3 })
      .eq("id", eventId);
    if (eventError) {
      console.log("Error sending to OCA:", eventError);
      toast.error("Failed to send to OCA");
    } else {
      setTimeout(() => {
        router.refresh();
      }, 500);
      toast.success("Event sent to OCA successfully");
    }
  };

  const launchEvent = async (eventId) => {
    console.log("Launching event:", eventId);
    const supabase = createClient();
    const { data: eventStatus, error: eventStatusError } = await supabase
      .from("events")
      .select("status")
      .eq("id", eventId)
      .maybeSingle();
    if (eventStatusError) {
      console.log("Error getting event status:", eventStatusError);
      toast.error("Failed to get event status");
    }
    if (eventStatus.status !== 4) {
      toast.error("Event is not ready to be launched");
      return;
    }
    const { data: event, error: eventError } = await supabase
      .from("events")
      .update({ status: 5 })
      .eq("id", eventId);
    if (eventError) {
      console.log("Error launching event:", eventError);
      toast.error("Failed to launch event");
    } else {
      toast.success("Event launched successfully");
    }
  };
  return (
    <Card className="w-full border-none">
      <CardHeader className="p-0 text-left my-4">
        <CardTitle>
          <Button
            variant="secondary"
            size="lg"
            className="cursor-text text-md font-semibold"
          >
            Waiting for your review
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-8">
          {pendingEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-lg space-y-2 shadow-lg shadow-gray-900"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-md font-medium">{event.title}</h3>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => sendToOCA(event.id)}
                    size="sm"
                    variant="outline"
                  >
                    Send to OCA
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => launchEvent(event.id)}
                  >
                    Launch Event
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Budget Form */}
                <div className="border rounded-lg p-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
                        <FileText className="h-16 w-16" />
                        <span className="font-medium">Budget Form</span>
                      </div>
                    </DialogTrigger>
                    <BudgetForm event={event} isApproved={false} />
                  </Dialog>
                  <FormActions formType="budget" eventId={event.id} />
                </div>

                {/* Event Form */}
                <div className="border rounded-lg p-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
                        <FileText className="h-16 w-16" />
                        <span className="font-medium">Event Form</span>
                      </div>
                    </DialogTrigger>
                    <EventForm event={event} isApproved={false} />
                  </Dialog>
                  <FormActions formType="event" eventId={event.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
