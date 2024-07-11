import { Calendar, Plus, Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import { api } from "../../lib/axios";

interface ActivityModalProps {
  closeActivityModal: () => void;
}

export default function ActivityModal({
  closeActivityModal,
}: ActivityModalProps) {
  const params = useParams();

  const createActivity = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const occurs_at = data.get("occurs_at")?.toString();

    api.post(`/trips/${params.tripId}/activities`, {
      title,
      occurs_at,
    });

    window.document.location.reload();
  };

  return (
    <div className="bg-black/60 inset-0 fixed flex items-center justify-center">
      <div className="w-[640px] rounded-xl shadow-md py-5 px-6 bg-zinc-900">
        <div className="space-y-2 flex gap-1 flex-col mb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button>
              <X
                onClick={closeActivityModal}
                className="size-5 text-zinc-400 cursor-pointer"
              />
            </button>
          </div>
          <p className="text-sm text-zinc-400 text-left">
            Todos os convidados podem visualizar as atividades
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              type="text"
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Calendar className="text-zinc-400 size-5" />
            <input
              type="datetime-local"
              name="occurs_at"
              placeholder="Data e horário da atividade"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" variant="primary">
              Salvar atividade
              <Plus className="size-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
