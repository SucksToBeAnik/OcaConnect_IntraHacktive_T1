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
import BudgetForm from "./BuddgetForm";



// Sample static data
const pendingEvents = [
  {
    id: "EVT-2024-001",
    title: "Coding Fest For ROBU 2024",
    budgetForm: "/path/to/budget.pdf",
    eventForm: "/path/to/event.pdf",
  },
  {
    id: "EVT-2024-002",
    title: "Cosplay From Cultural Club",
    budgetForm: "/path/to/budget.pdf",
    eventForm: "/path/to/event.pdf",
  }
];

const FormActions = () => (
  <div className="flex flex-col gap-2 mt-2">
    <EventForm/>
    <BudgetForm></BudgetForm>
    
    
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        className="flex-1 flex items-center gap-2"
      >
        <Download className="h-4 w-4" /> Download PDF
      </Button>
      
      <Button 
        variant="outline" 
        className="flex-1 flex items-center gap-2"
      >
        <CheckCircle className="h-4 w-4" /> Approve
      </Button>
      
      <Button 
        variant="outline"
        className="flex-1 flex items-center gap-2"
      >
        <RotateCcw className="h-4 w-4" /> Review
      </Button>
    </div>
  </div>
);

export default function EventPendingReview() {
  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Waiting for your review</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {pendingEvents.map((event) => (
            <div 
              key={event.id}
              className="border rounded-lg p-4 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.id}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Budget Form */}
                <div className="border rounded-lg p-4">
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-16 w-16" />
                    <span className="font-medium">Budget Form</span>
                  </div>
                  <FormActions />
                </div>

                {/* Event Form */}
                <div className="border rounded-lg p-4">
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-16 w-16" />
                    <span className="font-medium">Event Form</span>
                  </div>
                  <FormActions />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}