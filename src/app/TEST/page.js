import React from 'react';
import Header from './comp/header';
import SearchFilter from './comp/SearchFilter';
import EventList from './comp/EventList';
import EventPendingReview from './comp/EventPendingReview';
import { Button } from "@/components/ui/button"


const TEST = () => {
  return (
    <div className="flex flex-col h-screen ">

      <header className="w-full h-16 flex justify-between items-center px-4">
        <Header></Header>
      </header>


      <div className="flex-1 p-4 gap-4 grid grid-cols-12">
        {/* Left column */}
        <div className="col-span-4 flex flex-col gap-4">
          <SearchFilter></SearchFilter>

          <EventList></EventList>
        </div>

        {/* Right column */}
        <div className="col-span-8 flex flex-col gap-4">
          {/* Chat box */}
          <div className="flex-col justify-start items-end ">
            <h1 className="text-8xl font-bold tracking-tight lg:text-5xl">
                <div>Nothig More Easy</div>
                Than Hosting an
                <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                <div>Event</div>
                </div>
            </h1>
  
            <Button className="mt-1 mb-2 bg-gradient-to-r w-40 p-4 h-11 from-purple-200 via-violet-400 to-indigo-600 font-semibold">
                Create a New Event
            </Button>
             </div>


          <EventPendingReview></EventPendingReview>
        </div>
      </div>
    </div>
  );
};

export default TEST;