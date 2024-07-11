import { FormEvent, useState } from "react";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import ConfirmationModal from "./confirmation-modal";
import GuestsInputsModal from "./guests-input-modal";
import InviteGuestsModal from "./invite-guests-modal";
import InviteGuestSteps from "./steps/invete-guests-step";

export function CreateTripPage() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestModal, setIsGuestModal] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [confirmTripModalOpen, setConfirmTripModalOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEndDate, setEventStartAndEndDate] = useState<
    DateRange | undefined
  >(undefined);

  const navigate = useNavigate();

  const openGuestInput = () => {
    setIsGuestsInputOpen(true);
  };

  const closeGuestInput = () => {
    setIsGuestsInputOpen(false);
  };

  const openGuestModal = () => {
    setIsGuestModal(true);
  };

  const closeGuestModal = () => {
    setIsGuestModal(false);
  };

  const openConfirmTripModal = () => {
    setConfirmTripModalOpen(true);
  };

  const closeConfirmTripModal = () => {
    setConfirmTripModalOpen(false);
  };

  const createTrip = async () => {
    if (!destination) return;

    if (!eventStartAndEndDate?.from || !eventStartAndEndDate?.to) return;

    if (emailsToInvite.length === 0) return;

    if (!ownerName || !ownerEmail) return;

    const result = await api.post("/trips", {
      destination,
      starts_at: eventStartAndEndDate?.from,
      ends_at: eventStartAndEndDate?.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    navigate(`/trips/${result.data.tripId}`);
  };

  const addEmailToInvite = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString();
    if (!email) return;
    if (emailsToInvite.includes(email)) return;

    setEmailsToInvite((emails) => [...emails, email]);
    e.currentTarget.reset();
  };

  const removeEmailFromInvites = (emailToRemove: string) => {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );

    setEmailsToInvite(newEmailList);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-2">
          <img src="/logo.svg" alt="logo plann.er" />
          <p className="text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem
          </p>
        </div>
        <div className="space-y-4">
          <InviteGuestSteps
            closeGuestInput={closeGuestInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestInput={openGuestInput}
            setDestination={setDestination}
            setEventStartAndEndDate={setEventStartAndEndDate}
            eventStartAndEndDate={eventStartAndEndDate}
          />

          {isGuestsInputOpen && (
            <GuestsInputsModal
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestModal={openGuestModal}
            />
          )}
        </div>

        {isGuestModal && (
          <InviteGuestsModal
            addEmailToInvite={addEmailToInvite}
            closeGuestModal={closeGuestModal}
            emailsToInvite={emailsToInvite}
            removeEmailFromInvites={removeEmailFromInvites}
          />
        )}

        {confirmTripModalOpen && (
          <ConfirmationModal
            addEmailToInvite={addEmailToInvite}
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip}
            setOwnerEmail={setOwnerEmail}
            setOwnerName={setOwnerName}
          />
        )}

        <p className="text-zinc-500">
          Ao planejar sua viagem pela plann.er voce automaticamente concorda{" "}
          <br /> com nossos{" "}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-zinc-300 underline">
            Politicas de privacidade
          </a>
        </p>
      </div>
    </div>
  );
}
