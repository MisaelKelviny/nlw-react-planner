import { BoxIcon, User, X } from "lucide-react";
import { FormEvent } from "react";

interface ConfirmationModalProps {
  closeConfirmTripModal: () => void;
  addEmailToInvite: (e: FormEvent<HTMLFormElement>) => void;
  createTrip: () => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
}

export default function ConfirmationModal({
  closeConfirmTripModal,
  addEmailToInvite,
  createTrip,
  setOwnerName,
  setOwnerEmail,
}: ConfirmationModalProps) {
  return (
    <div className="bg-black/60 inset-0 fixed flex items-center justify-center">
      <div className="w-[640px] rounded-xl shadow-md py-5 px-6 bg-zinc-900">
        <div className="space-y-2 flex gap-1 flex-col py-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button>
              <X
                onClick={closeConfirmTripModal}
                className="size-5 text-zinc-400 cursor-pointer"
              />
            </button>
          </div>
          <p className="text-sm text-zinc-400 text-left">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-zinc-100">
              Florianópolis, Brasil
            </span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">
              16 a 27 de agosto de 2024
            </span>
          </p>
        </div>
        <form onSubmit={addEmailToInvite} className="space-y-3">
          <div className="h-14 px-4 flex-1 p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              type="text"
              name="text"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>
          <div className="h-14 px-4 flex-1 p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <BoxIcon className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>
          <button
            onClick={createTrip}
            type="submit"
            className="bg-lime-300 rounded-lg text-lime-950 px-5 py-2 font-medium flex w-full flex-1 items-center gap-2 hover:bg-lime-400 justify-center"
          >
            Confirmar criação da viagem
          </button>
        </form>
      </div>
    </div>
  );
}
