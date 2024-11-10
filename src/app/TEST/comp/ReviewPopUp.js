import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, AlertCircle } from "lucide-react";
import EventForm from './EventForm';
import BudgetForm from './BuddgetForm';



export default function ReviewPopUp({ isOpen, onClose }) {
  const [eventFormStatus, setEventFormStatus] = useState(null); // null | 'accepted' | 'review'
  const [budgetFormStatus, setBudgetFormStatus] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleEventAction = (action) => {
    if (action === 'accept') {
      setEventFormStatus('accepted');
    } else {
      setEventFormStatus('review');
    }
    setShowFeedback(false);
    checkAndCloseDialog();
  };

  const handleBudgetAction = (action) => {
    if (action === 'accept') {
      setBudgetFormStatus('accepted');
    } else {
      setBudgetFormStatus('review');
    }
    setShowFeedback(false);
    checkAndCloseDialog();
  };

  const checkAndCloseDialog = () => {
    // Close dialog if both forms have been actioned
    if (eventFormStatus && budgetFormStatus) {
      setTimeout(() => {
        onClose();
      }, 1000); // Give user time to see the status
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'accepted') {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (status === 'review') {
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Review Forms</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="event" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="event" className="flex-1">
              <div className="flex items-center gap-2">
                Event Form
                {eventFormStatus && getStatusIcon(eventFormStatus)}
              </div>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex-1">
              <div className="flex items-center gap-2">
                Budget Form
                {budgetFormStatus && getStatusIcon(budgetFormStatus)}
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Event Form Tab */}
          <TabsContent value="event">
            <div className="space-y-4">
              <div className="min-h-[400px]">
                <EventForm></EventForm>
              </div>

              {!eventFormStatus && (
                <div className="space-y-4">
                  {showFeedback ? (
                    <div className="space-y-4">
                      <Textarea 
                        placeholder="Enter your feedback..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowFeedback(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={() => handleEventAction('review')}
                        >
                          Send for Review
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => setShowFeedback(true)}
                      >
                        Send for Review
                      </Button>
                      <Button 
                        onClick={() => handleEventAction('accept')}
                      >
                        Accept
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {eventFormStatus && (
                <div className="rounded-lg p-3 bg-muted">
                  <p className="text-center text-muted-foreground">
                    {eventFormStatus === 'accepted' 
                      ? 'Form has been accepted' 
                      : 'Form has been sent for review'}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Budget Form Tab */}
          <TabsContent value="budget">
            <div className="space-y-4">
              <div className="min-h-[400px]">
                <BudgetForm></BudgetForm>
              </div>

              {!budgetFormStatus && (
                <div className="space-y-4">
                  {showFeedback ? (
                    <div className="space-y-4">
                      <Textarea 
                        placeholder="Enter your feedback..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowFeedback(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={() => handleBudgetAction('review')}
                        >
                          Send for Review
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => setShowFeedback(true)}
                      >
                        Send for Review
                      </Button>
                      <Button 
                        onClick={() => handleBudgetAction('accept')}
                      >
                        Accept
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {budgetFormStatus && (
                <div className="rounded-lg p-3 bg-muted">
                  <p className="text-center text-muted-foreground">
                    {budgetFormStatus === 'accepted' 
                      ? 'Form has been accepted' 
                      : 'Form has been sent for review'}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}