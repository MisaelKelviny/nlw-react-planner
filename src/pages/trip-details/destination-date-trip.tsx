import { format } from "date-fns";
import { Calendar, MapIcon, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import { api } from "../../lib/axios";

interface Trip {
  destination: string;
  starts_at: string;
  ends_at: string;
  id: string;
  is_confirmed: boolean;
}

export default function DestinationDateTrip() {
  const [trip, setTrip] = useState<Trip | undefined>(undefined);
  const { tripId } = useParams();

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((result) => setTrip(result.data.trip));
  }, [tripId]);

  const displayedDate =
    trip && trip.starts_at && trip.ends_at
      ? format(trip.starts_at, "d ' de ' LLL")
          .concat(" até ")
          .concat(format(trip.ends_at, "d' de 'LLL"))
      : null;

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapIcon className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800"></div>

        <Button variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}
