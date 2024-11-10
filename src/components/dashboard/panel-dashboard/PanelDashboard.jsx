"use client";

import { useState, useEffect } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import SearchFilter from "./SearchFilter";
import EventList from "./EventList";
import NewEventPopup from "./NewEventPopup";
import EventPendingReview from "./EventPendingReview";
import { createClient } from "@/utils/supabase/client";

export default function PanelDashboard({ clubId }) {
  const [eventList, setEventList] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);

  
  useEffect(() => {
    setPendingEvents(eventList.filter((event) => event.status !== 5 ));
  }, [eventList]);

  useEffect(() => {
    const supabase = createClient();

    async function fetchEvents() {
      const { data, error } = await supabase
        .from("events")
        .select("*, event_forms(*), budget_forms(*)")
        .eq("club_id", clubId);
      if (error) {
        console.log("Error fetching events:", error);
      }
      setEventList(data);
    }
    fetchEvents();
  }, [clubId]);

  return (
    <div className="flex flex-col h-screen ">
      {/* <header className="w-full h-16 flex justify-between items-center px-4">
        <Header />
      </header> */}

      <div className="flex-1 p-4 gap-4 grid grid-cols-12">
        {/* Left column */}
        <div className="col-span-4 flex flex-col gap-4">
          <SearchFilter />

          <EventList events={eventList} />
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

            <NewEventPopup clubId={clubId} />
          </div>

          <EventPendingReview pendingEvents={pendingEvents} />
        </div>
      </div>
    </div>
  );
}
