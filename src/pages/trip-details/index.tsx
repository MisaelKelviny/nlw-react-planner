import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CheckCircle2,
  CircleCheck,
  CircleDashed,
  Link2,
  Plus,
  UserCog,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import { api } from "../../lib/axios";
import InviteGuestsModal from "../create-trip/invite-guests-modal";
import ActivityModal from "./activities-modal";
import DayPlan from "./day-plann";
import DestinationDateTrip from "./destination-date-trip";
import RegisterLinkModal from "./register-link-modal";

interface Participants {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

interface Activities {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

interface Links {
  id: string;
  url: string;
  title: string;
}

export const TripDetailPage = () => {
  const [participants, setParticipants] = useState<Participants[]>([]);
  const [activities, setActivities] = useState<Activities[]>([]);
  const [links, setLinks] = useState<Links[]>([]);
  const [isGuestModal, setIsGuestModal] = useState(false);

  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [registerLinkModal, setRegisterLinkModal] = useState(false);

  const { tripId } = useParams();

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((result) => setParticipants(result.data.participants));

    api
      .get(`/trips/${tripId}/activities`)
      .then((result) => setActivities(result.data.activities));

    api
      .get(`/trips/${tripId}/links`)
      .then((result) => setLinks(result.data.links));
  }, [tripId]);

  const closeActivityModal = () => {
    setActivityModalOpen(false);
  };

  const openActivityModal = () => {
    setActivityModalOpen(true);
  };

  const closeRegisterLinkModal = () => {
    setRegisterLinkModal(false);
  };

  const openRegisterLinkModal = () => {
    setRegisterLinkModal(true);
  };

  const openGuestModal = () => {
    setIsGuestModal(true);
  };

  const closeGuestModal = () => {
    setIsGuestModal(false);
  };

  const removeEmailFromInvites = (emailToRemove: string) => {
    const newEmailList = participants.filter(
      (email) => email.email !== emailToRemove
    );

    setParticipants(newEmailList);
  };

  const addEmailToInvite = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString();
    if (!email) return;
    if (participants.map((p) => p.email).includes(email)) return;

    // setParticipants();

    e.currentTarget.reset();
  };

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationDateTrip />

      <main className="flex gap-16 ">
        <div className="flex-1 space-y-6">
          <div className="flex justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button onClick={openActivityModal} variant="primary">
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </div>

          <div className="space-y-8">
            {activities.map((item) => (
              <DayPlan
                key={item.date}
                day={format(item.date, "EEE", { locale: ptBR })}
                dayNumber={Number(format(item.date, "d"))}
                activity={
                  item.activities.length > 0
                    ? item.activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-md flex items-center gap-3"
                        >
                          <CircleCheck className="text-lime-300 size-5" />
                          <span className="text-zinc-100">
                            {activity.title}
                          </span>
                          <span className="text-zinc-400 text-sm ml-auto">
                            {format(activity.occurs_at, "hh:mm")}h
                          </span>
                        </div>
                      ))
                    : undefined
                }
              />
            ))}
          </div>
        </div>

        {activityModalOpen && (
          <ActivityModal closeActivityModal={closeActivityModal} />
        )}

        {registerLinkModal && (
          <RegisterLinkModal closeRegisterLink={closeRegisterLinkModal} />
        )}

        {isGuestModal && (
          <InviteGuestsModal
            addEmailToInvite={addEmailToInvite}
            closeGuestModal={closeGuestModal}
            emailsToInvite={participants.map((p) => p.email)}
            removeEmailFromInvites={removeEmailFromInvites}
          />
        )}

        <div className="w-80 space-y-6">
          <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>

            <div className="space-y-5">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">
                      {link.title}
                    </span>
                    <a
                      href={link.url}
                      className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                    >
                      {link.url}
                    </a>
                  </div>

                  <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>
              ))}
            </div>
            <Button onClick={openRegisterLinkModal} variant="secondary">
              <Plus className="size-5" />
              Cadastrar novo link
            </Button>
            <div className="w-full h-px bg-zinc-800"></div>
          </div>

          <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>

            <div className="space-y-5">
              {participants.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">
                      {item.name ?? `Convidado ${index}`}
                    </span>
                    <span className="block text-sm text-zinc-400 truncate">
                      {item.email}
                    </span>
                  </div>

                  {item.is_confirmed ? (
                    <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                  ) : (
                    <CheckCircle2 className="text-green-400 size-5 shrink-0" />
                  )}
                </div>
              ))}
            </div>
            <Button onClick={openGuestModal} variant="secondary">
              <UserCog className="size-5" />
              Gerenciar convidados
            </Button>
            <div className="w-full h-px bg-zinc-800"></div>
          </div>
        </div>
      </main>
    </div>
  );
};
