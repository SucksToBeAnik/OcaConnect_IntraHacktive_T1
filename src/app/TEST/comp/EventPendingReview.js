"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, CalendarDays } from "lucide-react";
import ReviewPopUp from "./ReviewPopUp";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

// Sample static data
const pendingEvents = [
  {
    id: "EVT-2024-000",
    title: "BRACU Hackathon 2024",
    budgetForm: "/path/to/budget.pdf",
    eventForm: "/path/to/event.pdf",
  },
  {
    id: "EVT-2024-001",
    title: "Annual Tech Conference 2024",
    budgetForm: "/path/to/budget.pdf",
    eventForm: "/path/to/event.pdf",
  },
  {
    id: "EVT-2024-002",
    title: "Leadership Summit Q2",
    budgetForm: "/path/to/budget.pdf",
    eventForm: "/path/to/event.pdf",
  },
  {
    id: "EVT-2024-001",
    title: "Annual Tech Conference 2024",
    budgetForm: "/path/to/budget.pdf",
    eventForm: "/path/to/event.pdf",
  },
  {
    id: "EVT-2024-001",
    title: "Annual Tech Conference 2024",
    budgetForm: "/path/to/budget.pdf",
    eventForm: "/path/to/event.pdf",
  },
  {
    id: "EVT-2024-001",
    title: "Annual Tech Conference 2024",
    budgetForm: "/path/to/budget.pdf",
    eventForm: "/path/to/event.pdf",
  },
];

export default function EventPendingReview() {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const handleReviewClick = () => {
    setIsReviewOpen(!isReviewOpen);
  };
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Waiting for your review</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pendingEvents.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg p-3 flex flex-col items-start justify-between"
            >
              {/* Event Info */}
              <div className="flex-grow flex flex-col gap-1 mb-2">
                <h3 className="font-medium">{event.title}</h3>
                <p variant="outline" size="sm" className="text-xs text-muted-foreground">{event.id}</p>
              </div>

              {/* Forms Status */}
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-1 border rounded-md p-1 px-2">
                  <FileSpreadsheet className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Budget</span>
                </div>
                <div className="flex items-center gap-1 border rounded-md p-1 px-2">
                  <CalendarDays className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">Event</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleReviewClick}>
                  Review Forms
                </Button>
              </div>

              {/* Action Button */}

              <ReviewPopUp
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
