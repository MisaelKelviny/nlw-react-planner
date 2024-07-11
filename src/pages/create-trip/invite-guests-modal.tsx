import { AtSign, Plus, X } from "lucide-react";
import { FC, FormEvent } from "react";

interface InviteGuestsModalProps {
  closeGuestModal: () => void;
  addEmailToInvite: (e: FormEvent<HTMLFormElement>) => void;
  removeEmailFromInvites: (email: string) => void;
  emailsToInvite: string[];
}

const InviteGuestsModal: FC<InviteGuestsModalProps> = ({
  addEmailToInvite,
  closeGuestModal,
  emailsToInvite,
  removeEmailFromInvites,
}) => {
  return (
    <div className="bg-black/60 inset-0 fixed flex items-center justify-center">
      <div className="w-[640px] rounded-xl shadow-md py-5 px-6 bg-zinc-900">
        <div className="space-y-2 flex gap-1 flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar Convidados</h2>
            <button>
              <X
                onClick={closeGuestModal}
                className="size-5 text-zinc-400 cursor-pointer"
              />
            </button>
          </div>
          <p className="text-sm text-zinc-400 text-left">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 my-4">
          {emailsToInvite.map((email) => (
            <div
              key={email}
              className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
            >
              <span className="text-zinc-300">{email}</span>
              <button>
                <X
                  onClick={() => removeEmailFromInvites(email)}
                  className="size-3 text-zinc-400 cursor-pointer"
                />
              </button>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-zinc-800 my-4" />

        <form
          onSubmit={addEmailToInvite}
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="px-2 flex items-center flex-1 gap-2">
            <AtSign />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <button
            type="submit"
            className="bg-lime-300 rounded-lg text-lime-950 px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
          >
            Convidar
            <Plus className="size-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteGuestsModal;
