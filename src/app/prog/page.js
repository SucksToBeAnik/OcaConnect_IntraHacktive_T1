import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SearchFilter from './comp/SearchFilter';
import EventProgList from './comp/EventProgList';

const EventProgLayout = () => {
  return (
    <div className="flex flex-col h-screen p-4 gap-4 max-w-7xl mx-auto w-full">
      {/* Search and Filter Section */}
      <Card className="w-full">
        <CardContent className="p-6">
          {/* Placeholder for SearchFilter component */}
          <SearchFilter></SearchFilter>
        </CardContent>
      </Card>

      {/* Events List Section - Takes remaining space */}
      <Card className="flex-1 min-h-0">
        <CardContent className="p-6 h-full">
          <EventProgList></EventProgList>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default EventProgLayout;