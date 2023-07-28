/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { checkLinkAtom, isCustomAtom } from "@/atoms/home";
import CustomHashInput from "@/components/CustomHashInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";
import CopyIcon from "@/components/Icons/Copy.icon";
import PlusIcon from "@/components/Icons/Plus.icon";
import Checkbox from "@/components/Inputs/Checkbox";
import Loader from "@/components/Loader";
import RepoLinksRow from "@/components/RepoLinksRow";
import Text from "@/components/Typography/text";
import { BACKEND_URL } from "@/constants/env";
import { cn } from "@/utils/className";
import { useAtom } from "jotai";
import { Expletus_Sans, Poppins } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Toaster, toast } from "react-hot-toast";

const expletus = Expletus_Sans({
  display: "swap",
  variable: "--expletus-sans",
  subsets: ["latin-ext"],
});

const poppins = Poppins({
  display: "swap",
  variable: "--poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const urlRegex = new RegExp(
  "^((https?|ftp|smtp)://)?(www.)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"
);

export default function Home() {
  const [shortened, setShortened] = useState<string>("");
  const [shortening, setShortening] = useState<boolean>(false);
  const [useCustom, setIsCustom] = useAtom(isCustomAtom);

  const handleError = (res: Response) => {
    if (res.status === 429)
      return toast.error("Você está fazendo muitas requisições!");

    return res.json().then((err: { message: string } | string) => {
      toast.error(
        typeof err === "string"
          ? err
          : "message" in err
          ? err.message
          : "Erro desconhecido!"
      );
    });
  };

  const fetchShortened = async (url: string, customHash?: string) => {
    const fetchUrl = customHash ? BACKEND_URL + "/" + customHash : BACKEND_URL;
    const res = await fetch(fetchUrl, {
      method: "POST",
      body: JSON.stringify({ url }),
    }).then(async (res) => {
      if (res?.ok) return res.json();
      await handleError(res);
      return false;
    });

    return res;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (urlRegex.test(`${(e.target as any)?.["url"]?.value}`) === false)
      return toast.error("Coloque uma url válida!");

    const url = `${(e.target as any)?.["url"]?.value}`;
    const customHash = `${(e.target as any)?.["hash"]?.value ?? ""}`;

    if (customHash?.length > 0) {
      if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(customHash))
        return toast.error("O link escolhido é inválido!");
    }

    setShortening(true);
    fetchShortened(url, useCustom ? customHash : undefined)
      .then((res) => {
        if (res?.hash)
          setShortened((prev) => (!prev ? `https://peq.nu/${res.hash}` : ""));
      })
      .finally(() => setShortening(false));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortened);
    toast.success("Link copiado para área de transferência!", {
      icon: "📋",
    });
  };

  const handleReset = () => {
    setShortened("");
    const urlInput = document.getElementById("url") as HTMLInputElement;
    const hashInput = document.getElementById("hash") as HTMLInputElement;

    urlInput.value = "";
    hashInput.value = "";
  };

  return (
    <>
      <Head>
        <title>peq.nu</title>
        <meta
          name="description"
          content="Encurtador de links simples e direto ao ponto :)"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={cn(
          "flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-dark",
          "relative",
          expletus.className,
          poppins.className
        )}
      >
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-col items-end justify-center">
            <Text
              as="h1"
              className="font-expletus-sans text-primary"
              size="8xl"
            >
              peq
            </Text>
            <Text
              as="h1"
              className="font-expletus-sans mt-[-16px] text-white"
              size="8xl"
            >
              <span className="text-primary">.</span>nu
            </Text>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="group relative w-[600px] max-w-[95vw] overflow-hidden rounded-full lg:max-w-[600px]">
                <input
                  id="url"
                  name="url"
                  placeholder="Coloque aqui seu link grande"
                  className={cn(
                    "mr-[100px] h-10 w-full rounded-full pl-3 pr-36",
                    "border border-gray-700/10 bg-[#223733] text-white focus:outline-none",
                    "text-center font-expletus placeholder:text-gray-400"
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    "-ml-8 h-10 rounded-full bg-primary px-8 font-poppins font-semibold text-white",
                    "absolute right-0 top-0 max-w-full"
                  )}
                >
                  {shortening ? (
                    <Loader className="translate-x-[-40px] scale-50" />
                  ) : (
                    <Text as="span" size="lg">
                      Encurtar
                    </Text>
                  )}
                </button>
                <div
                  className={cn(
                    "absolute right-0 top-0 z-20 h-10 w-full rounded-full",
                    "bg-primary text-white",
                    "flex items-center justify-center gap-3",
                    "translate-x-1/2 scale-x-0 transition-all",
                    !!shortened && "translate-x-0 scale-x-100"
                  )}
                >
                  <Text as="span" size="lg">
                    {shortened}
                  </Text>
                  <div className="absolute right-5 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleCopy()}
                      title="Copiar para área de transferência"
                    >
                      <CopyIcon />
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      title="Gerar novo link encurtado"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>
              </div>
              <CustomHashInput />
            </form>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Checkbox
                id="customLink"
                label="Link personalizado"
                labelClassName="text-white"
                onCheckedChange={(checked) => {
                  if (!checked) return setIsCustom(false);
                  return setIsCustom(true);
                }}
              />
            </div>
          </div>
        </div>
        <RepoLinksRow />
        <CheckButton />
        <CheckLinkDialog />
      </main>
      <Toaster />
    </>
  );
}

function CheckButton() {
  const [, setCheckLink] = useAtom(checkLinkAtom);
  const handleTriggerClick = () => {
    setCheckLink((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={handleTriggerClick}
      className={cn(
        "h-10 rounded-full bg-secondary px-8 font-poppins font-semibold text-green-950",
        "absolute bottom-10 right-10 max-w-full"
      )}
    >
      Checar status de link
    </button>
  );
}

interface Stats {
  clicks: number;
  custom: boolean;
  url: string;
}

function CheckLinkDialog() {
  const [openCheckLink, setOpenCheckLink] = useAtom(checkLinkAtom);
  const [stats, setStats] = useState<Stats>();

  const handleError = (res: Response) => {
    if (res.status === 429)
      return toast.error("Você está fazendo muitas requisições!");
    if (res.status === 503)
      return toast.error("Serviço indisponível no momento!");

    return res.json().then((err: { message: string } | string) => {
      toast.error(
        typeof err === "string"
          ? err
          : "message" in err
          ? err.message
          : "Erro desconhecido!"
      );
    });
  };

  const fetchStatistics = async (hash: string) => {
    const fetchUrl = BACKEND_URL + hash + "/status";
    const res = await fetch(fetchUrl, {
      method: "GET",
    }).then(async (res) => {
      if (res?.ok) return res.json();
      await handleError(res);
      return false;
    });

    return res;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `${(e.target as any)?.["shortUrl"]?.value}`;
    const isPeqNu = url.includes("peq.nu");
    if (!isPeqNu) {
      toast.error("Apenas links do peq.nu são aceitos!");
      return;
    }
    const hash = url.split("peq.nu/")[1];
    if (!hash?.length) return toast.error("Link inválido!");
    await fetchStatistics(hash).then((res: Stats) => setStats(res));
  };

  return (
    <Dialog
      open={openCheckLink}
      onOpenChange={(o) => {
        setOpenCheckLink(o);
        setStats(undefined);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Text as="h2" size="base" className="font-semibold text-gray-200">
              Estatísticas de link
            </Text>
          </DialogTitle>
          <DialogDescription>
            <Text as="h3" size="lg" className="font-extrabold text-gray-200">
              Cheque o status de um link encurtado.
            </Text>
            <form
              onSubmit={handleSubmit}
              className="mb-5 mt-8 flex flex-col items-center gap-4"
            >
              <input
                id="shortUrl"
                name="shortUrl"
                placeholder="Coloque aqui seu link peq.nu/..."
                className={cn(
                  "h-10 w-full rounded-full px-3",
                  "border border-gray-700/10 bg-[#223733] text-white focus:outline-none",
                  "text-center font-expletus placeholder:text-gray-400"
                )}
              />
              <button
                type="submit"
                className={cn(
                  "h-10 rounded-full bg-primary px-8 font-poppins font-semibold text-white",
                  "max-w-full"
                )}
              >
                Checar
              </button>
            </form>
            {stats && (
              <div className="mt-10">
                <Text
                  as="h3"
                  size="lg"
                  className="font-extrabold text-gray-200"
                >
                  Estatísticas:
                </Text>
                <div className="mt-4 space-y-2">
                  <Text
                    as="p"
                    size="sm"
                    className="font-semibold text-gray-200"
                  >
                    Cliques: <span className="font-bold">{stats.clicks}</span>
                  </Text>
                  <Text
                    as="p"
                    size="sm"
                    className="font-semibold text-gray-200"
                  >
                    Link personalizado:{" "}
                    <span className="font-bold">
                      {stats.custom ? "Sim" : "Não"}
                    </span>
                  </Text>
                  <Text
                    as="p"
                    size="sm"
                    className="font-semibold text-gray-200"
                  >
                    Link original:{" "}
                    <Link
                      href={stats.url}
                      target="_blank"
                      className="whitespace-nowrap font-bold underline"
                    >
                      {stats.url}
                    </Link>
                  </Text>
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
