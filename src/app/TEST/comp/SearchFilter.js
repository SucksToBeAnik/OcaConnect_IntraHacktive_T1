import React from 'react';
import { Search, SlidersHorizontal, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const SearchFilter = () => {
  return (
    <Card >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          Search and Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
          <Input 
            placeholder="Search events..." 
            className="pl-8"
          />
        </div>

        <Accordion type="single" collapsible className="w-full">
          {/* Event Status Filter */}
          <AccordionItem value="status" className="border-white/20">
            <AccordionTrigger className="text-white hover:text-white/80">
              Event Status
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="active" />
                  <Label htmlFor="active" className="text-sm">Active Events</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pending" />
                  <Label htmlFor="pending" className="text-sm">Pending Events</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="past" />
                  <Label htmlFor="past" className="text-sm">Past Events</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Date Range Filter */}
          <AccordionItem value="date" >
            <AccordionTrigger>
              Date Range
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <Select>
                  <SelectTrigger >
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>

          
        </Accordion>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            className="flex-1"
          >
            Apply Filters
          </Button>
          <Button 
            variant="ghost" 
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilter;