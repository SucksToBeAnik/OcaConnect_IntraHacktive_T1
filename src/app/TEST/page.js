import React from "react";
import Header from "./comp/header";
import SearchFilter from "./comp/SearchFilter";
import EventList from "./comp/EventList";
import EventPendingReview from "./comp/EventPendingReview";
import { Button } from "@/components/ui/button";
import NewEventPopup from "./comp/NewEventPopup";
import EVSearchBox from "./comp/EVSearchBox";
import ArchivedEvents from "./comp/ArchivedEvents";
import { Card } from "@/components/ui/card";
import RoomMap from "./comp/RoomMap";

const TEST = () => {
  return (
    <div className="flex flex-col h-screen ">
      <header className="w-full h-16 flex justify-between items-center px-4">
        <Header></Header>
      </header>

      <div className="flex-1 p-4 gap-4 grid grid-cols-12">
        {/* Left column */}
        <div className="col-span-4 flex flex-col gap-4">
          <EVSearchBox></EVSearchBox>
          <EventPendingReview></EventPendingReview>
        </div>

        {/* Right column */}
        <div className="col-span-8 flex flex-col gap-4">
          <Card className='p-5'>
            <RoomMap></RoomMap>
          </Card>
          <ArchivedEvents></ArchivedEvents>
        </div>

        
      </div>
    </div>
  );
};

export default TEST;
