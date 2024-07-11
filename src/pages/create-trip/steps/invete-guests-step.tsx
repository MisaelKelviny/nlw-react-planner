import { ArrowRight, Settings2 } from "lucide-react";
import { DateRange } from "react-day-picker";
import Button from "../../../components/button";
import DestinationAndDate from "../destination-date";

interface InviteGuestStepsProps {
  isGuestsInputOpen: boolean;
  closeGuestInput: () => void;
  openGuestInput: () => void;
  setEventStartAndEndDate: (dates: DateRange | undefined) => void;
  setDestination: (destination: string) => void;
  eventStartAndEndDate: DateRange | undefined;
}

export default function InviteGuestSteps({
  isGuestsInputOpen,
  closeGuestInput,
  openGuestInput,
  setDestination,
  setEventStartAndEndDate,
  eventStartAndEndDate,
}: InviteGuestStepsProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-md">
      <DestinationAndDate
        setDestination={setDestination}
        isGuestsInputOpen={isGuestsInputOpen}
        setEventStartAndEndDate={setEventStartAndEndDate}
        eventStartAndEndDate={eventStartAndEndDate}
      />

      <div className="w-px mr-3 h-6 bg-zinc-800"></div>

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestInput} variant="primary">
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
