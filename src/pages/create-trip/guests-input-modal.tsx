import { ArrowRight, UserRoundPlus } from "lucide-react";

interface GuestsInputsModalProps {
  openGuestModal: () => void;
  emailsToInvite: string[];
  openConfirmTripModal: () => void;
}

export default function GuestsInputsModal({
  openGuestModal,
  emailsToInvite,
  openConfirmTripModal,
}: GuestsInputsModalProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-md">
      <button
        type="button"
        onClick={openGuestModal}
        className="flex items-center gap-2 flex-1 text-left"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-100">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span
            className="text-zinc-400 text-lg
      flex-1"
          >
            Quem estará na viagem?
          </span>
        )}
      </button>

      <button
        onClick={openConfirmTripModal}
        className="bg-lime-300 rounded-lg text-lime-950 px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
      >
        Confirmar viagem
        <ArrowRight className="size-5" />
      </button>
    </div>
  );
}
