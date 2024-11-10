
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Clock
} from "lucide-react";

const BudgetForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <BadgeDollarSign className="mr-2 h-4 w-4" />
          Create Budget Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
            {/* Pre-filled Information */}
            <Card className="border border-muted">
              <CardHeader>
                <CardTitle className="text-lg">Pre-filled Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Event ID</Label>
                    <p className="font-mono">EVT-2024-001</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Event Title</Label>
                    <p>Annual Technology Conference</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Budget Estimate */}
            <div>
              <Label htmlFor="totalBudget" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-foreground" />
                Total Estimated Budget
              </Label>
              <Input 
                id="totalBudget" 
                type="number" 
                placeholder="Enter total estimated amount"
                className="mt-1"
              />
            </div>

            {/* Detailed Cost Breakdown */}
            <Card className="border border-muted">
              <CardHeader>
                <CardTitle className="text-lg">Detailed Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="venueCosts" className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-foreground" />
                    Venue/Location Costs
                  </Label>
                  <Input 
                    id="venueCosts" 
                    type="number" 
                    placeholder="Enter venue and setup costs"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="equipmentCosts" className="flex items-center gap-2">
                    <Tv className="h-4 w-4 text-foreground" />
                    Technical Equipment
                  </Label>
                  <Input 
                    id="equipmentCosts" 
                    type="number" 
                    placeholder="Enter technical equipment costs"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="decorCosts" className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-foreground" />
                    Decorations and Supplies
                  </Label>
                  <Input 
                    id="decorCosts" 
                    type="number" 
                    placeholder="Enter decoration and supplies costs"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="marketingCosts" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-foreground" />
                    Marketing and Promotion
                  </Label>
                  <Input 
                    id="marketingCosts" 
                    type="number" 
                    placeholder="Enter marketing and promotional costs"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="refreshmentCosts" className="flex items-center gap-2">
                    <Coffee className="h-4 w-4 text-foreground" />
                    Refreshments
                  </Label>
                  <Input 
                    id="refreshmentCosts" 
                    type="number" 
                    placeholder="Enter food and beverage costs"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="transportCosts" className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-foreground" />
                    Transportation and Logistics
                  </Label>
                  <Input 
                    id="transportCosts" 
                    type="number" 
                    placeholder="Enter transportation and logistics costs"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="otherCosts" className="flex items-center gap-2">
                    <Plus className="h-4 w-4 text-foreground" />
                    Other Expenses
                  </Label>
                  <Input 
                    id="otherCosts" 
                    type="number" 
                    placeholder="Enter any other costs"
                    className="mt-1"
                  />
                  <Textarea 
                    id="otherCostsDetails" 
                    placeholder="Please specify other expenses"
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Funding Details */}
            <Card className="border border-muted">
              <CardHeader>
                <CardTitle className="text-lg">Funding Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <BadgeDollarSign className="h-4 w-4 text-foreground" />
                    Budget Source
                  </Label>
                  <RadioGroup defaultValue="oca">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="oca" id="oca" />
                      <Label htmlFor="oca">OCA Funding Request</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sponsorship" id="sponsorship" />
                      <Label htmlFor="sponsorship">Sponsorship</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Sponsor Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sponsors" className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-foreground" />
                      Sponsor Names
                    </Label>
                    <Textarea 
                      id="sponsors" 
                      placeholder="List confirmed or potential sponsors"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="branding" className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-foreground" />
                      Branding Requirements
                    </Label>
                    <Textarea 
                      id="branding" 
                      placeholder="Detail any specific branding or promotional obligations"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="border border-muted">
              <CardHeader>
                <CardTitle className="text-lg">Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="notes" className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-foreground" />
                    Notes from Event Organizer
                  </Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Add any specific notes or special instructions"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-foreground" />
                    Review Status
                  </Label>
                  <p className="text-muted-foreground">Pending Review</p>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button className="w-full">
              Submit Budget for Review
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetForm;