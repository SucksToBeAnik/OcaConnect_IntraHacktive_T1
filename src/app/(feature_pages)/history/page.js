import ArchivedEvents from "@/app/TEST/comp/ArchivedEvents";
import RoomMap from "@/components/history/RoomMap";

export default function Page() {
  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-8xl font-bold tracking-tight lg:text-5xl">
          <div>Missed any event?</div>
          See past
          <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            <div>Events</div>
          </div>
        </h1>
        <RoomMap />
      </div>
      <ArchivedEvents />
    </div>
  );
}
