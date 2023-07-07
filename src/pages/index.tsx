/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import CopyIcon from "@/components/Icons/Copy.icon";
import PlusIcon from "@/components/Icons/Plus.icon";
import Loader from "@/components/Loader";
import Text from "@/components/Typography/text";
import { cn } from "@/utils/className";
import { Expletus_Sans, Poppins } from "next/font/google";
import Head from "next/head";
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

  const fetchShortened = async (url: string) => {
    const res: {
      hash: string;
    } = await fetch("https://peqnu-backend-aflavziouq-uc.a.run.app/", {
      method: "POST",
      body: JSON.stringify({ url }),
    }).then((res) => res.json());

    return res;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (urlRegex.test(`${(e.target as any)?.["url"]?.value}`) === false)
      return toast.error("Coloque uma url válida!");

    const url = `${(e.target as any)?.["url"]?.value}`;
    setShortening(true);
    fetchShortened(url)
      .then((res) => {
        setShortened((prev) => (!prev ? `https://peq.nu/${res?.hash}` : ""));
        setShortening(false);
      })
      .catch(() => void 0);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortened);
    toast.success("Link copiado para área de transferência!", {
      icon: "📋",
    });
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
            <form onSubmit={handleSubmit}>
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
                      onClick={() => setShortened("")}
                      title="Gerar novo link encurtado"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
}
