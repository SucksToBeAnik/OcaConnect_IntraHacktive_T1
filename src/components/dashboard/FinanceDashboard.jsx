import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import { DialogTrigger, Dialog } from "../ui/dialog";
import { Separator } from "../ui/separator";
import BudgetForm from "./BudgetForm";
import { createClient } from "@/utils/supabase/server";

// const pendingEvents = [
//   {
//     title: "BRACU CSE Fest 2024",
//     date: "10/10/2024",
//     budget: "50,000",
//     sponsor: "N/A",
//   },
//   {
//     title: "BRACU Tech Summit 2024",
//     date: "15/11/2024",
//     budget: "30,000",
//     sponsor: "N/A",
//   },
//   {
//     title: "BRACU Gaming Tournament",
//     date: "20/12/2024",
//     budget: "20,000",
//     sponsor: "N/A",
//   },
// ];

const pastEvents = [
  {
    title: "BRACU Hackathon 2024",
    date: "10/10/2024",
    budget: "20,000",
    sponsor: "BRACU",
  },
  {
    title: "BRACU Career Fair 2023",
    date: "15/12/2023",
    budget: "15,000",
    sponsor: "BRACU",
  },
  {
    title: "BRACU Tech Week 2023",
    date: "20/11/2023",
    budget: "10,000",
    sponsor: "BRACU",
  },
];

export default async function FinanceDashboard({ clubId }) {
  const supabase = createClient();
  let pendingEvents = [];
  const { data: eventsData, error } = await supabase
    .from("events")
    .select("*, event_forms(*), budget_forms(*)")
    .eq("status", 1)
    .eq("club_id", clubId)
    ;
  console.log(eventsData);
  if (eventsData) {
    pendingEvents = eventsData;
  }
  return (
    <div className="grid grid-cols-12 gap-6 p-4 w-full h-full">
      <div className="col-span-5 flex flex-col gap-6">
        <div className="mb-2">
          <h1 className="text-5xl font-bold tracking-tight">
            <p>Finance</p>
            <p>Management</p>
            <p className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              Dashboard
            </p>
          </h1>
        </div>
        <div className="space-y-4 max-h-[calc(100vh-380px)] overflow-y-auto pr-2">
          <h2 className="text-2xl font-semibold text-muted-foreground sticky top-0 bg-background py-2">
            Pending Approvals
            <Badge variant="outline" className="text-sm ml-1">
              {pendingEvents.length}
            </Badge>
          </h2>
          {pendingEvents.map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{event.title}</CardTitle>
                  {/* <Button variant="outline" size="sm">
                    <Calendar className="mr-1 h-4 w-4" />
                    Will be held on {event.date}
                  </Button> */}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    Required Budget:{" "}
                    <Badge variant="outline">
                      {event?.budget_forms?.estimated_budget || "N/A"} BDT
                    </Badge>
                  </div>
                  <div>
                    Sponsor:{" "}
                    <Badge variant="outline">
                      {event?.event_forms?.sponsor_names || "N/A"}
                    </Badge>
                  </div>
                  <div className="flex gap-2 justify-between items-center mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="secondary" size="sm">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <BudgetForm event={event} />
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="col-span-2 flex justify-center">
        <Separator orientation="vertical" className="h-full" />
      </div>

      <div className="col-span-5 flex flex-col gap-6">
        <div className="space-y-4 max-h-[calc(100vh-190px)] overflow-y-auto pr-2">
          <h2 className="text-2xl font-semibold text-muted-foreground sticky top-0 bg-background py-2">
            Past Event Budgets
          </h2>
          {pastEvents.map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{event.title}</CardTitle>
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-1 h-4 w-4" />
                    Held on {event.date}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>Total Budget: {event.budget} BDT</p>
                  <div>
                    Sponsor: <Badge variant="outline">{event.sponsor}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
