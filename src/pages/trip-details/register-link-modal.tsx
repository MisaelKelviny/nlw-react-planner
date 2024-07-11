import { Link2, Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import { api } from "../../lib/axios";

interface RegisterLinkModalProp {
  closeRegisterLink: () => void;
}

export default function RegisterLinkModal({
  closeRegisterLink,
}: RegisterLinkModalProp) {
  const params = useParams();

  const createLink = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    api.post(`/trips/${params.tripId}/links`, {
      title,
      url,
    });

    window.document.location.reload();
  };

  return (
    <div className="bg-black/60 inset-0 fixed flex items-center justify-center">
      <div className="w-[640px] rounded-xl shadow-md py-5 px-6 bg-zinc-900">
        <div className="space-y-2 flex gap-1 flex-col mb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <button>
              <X
                onClick={closeRegisterLink}
                className="size-5 text-zinc-400 cursor-pointer"
              />
            </button>
          </div>
          <p className="text-sm text-zinc-400 text-left">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>

        <form onSubmit={createLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              type="text"
              name="title"
              placeholder="Titulo do link"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2 className="text-zinc-400 size-5" />
            <input
              type="text"
              name="url"
              placeholder="URL"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" variant="primary">
              Salvar link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
