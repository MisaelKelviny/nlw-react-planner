import { format } from "date-fns";
import { Calendar, MapPin, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DestinationAndDateProps {
  isGuestsInputOpen: boolean;
  setDestination: (destination: string) => void;
  setEventStartAndEndDate: (dates: DateRange | undefined) => void;
  eventStartAndEndDate: DateRange | undefined;
}

export default function DestinationAndDate({
  isGuestsInputOpen,
  setDestination,
  setEventStartAndEndDate,
  eventStartAndEndDate,
}: DestinationAndDateProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const openDatePicker = () => {
    return setIsDatePickerOpen(true);
  };

  const closeDatePicker = () => {
    return setIsDatePickerOpen(false);
  };

  const displayedDate =
    eventStartAndEndDate && eventStartAndEndDate.from && eventStartAndEndDate.to
      ? format(eventStartAndEndDate.from, "d ' de ' LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDate.to, "d' de 'LLL"))
      : null;

  return (
    <>
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none
                flex-1"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <button
        disabled={isGuestsInputOpen}
        onClick={openDatePicker}
        className="flex items-center gap-2 w-[240px] text-left"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-zinc-400 text-lg w-40 flex-1">
          {displayedDate ?? "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="bg-black/60 inset-0 fixed flex items-center justify-center">
          <div className="rounded-xl shadow-md py-5 px-6 bg-zinc-900">
            <div className="space-y-2 flex gap-1 flex-col py-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button>
                  <X
                    onClick={closeDatePicker}
                    className="size-5 text-zinc-400 cursor-pointer"
                  />
                </button>
              </div>
            </div>
            <DayPicker
              mode="range"
              selected={eventStartAndEndDate}
              onSelect={setEventStartAndEndDate}
            />
          </div>
        </div>
      )}
    </>
  );
}
