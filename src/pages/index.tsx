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
import { BACKEND_URL } from "@/constants/env";
import { cn } from "@/utils/className";
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

  const fetchShortened = async (url: string) => {
    const res: {
      hash: string;
    } = await fetch(BACKEND_URL, {
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
          <div className="flex items-center justify-center gap-8">
            <Link href="https://peq.nu/b81TAmJ" title="Github - Frontend">
              <svg
                stroke="#fff"
                fill="#fff"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="60px"
                width="60px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm3.163 21.783h-.093a.513.513 0 0 1-.382-.14.513.513 0 0 1-.14-.372v-1.406c.006-.467.01-.94.01-1.416a3.693 3.693 0 0 0-.151-1.028 1.832 1.832 0 0 0-.542-.875 8.014 8.014 0 0 0 2.038-.471 4.051 4.051 0 0 0 1.466-.964c.407-.427.71-.943.885-1.506a6.77 6.77 0 0 0 .3-2.13 4.138 4.138 0 0 0-.26-1.476 3.892 3.892 0 0 0-.795-1.284 2.81 2.81 0 0 0 .162-.582c.033-.2.05-.402.05-.604 0-.26-.03-.52-.09-.773a5.309 5.309 0 0 0-.221-.763.293.293 0 0 0-.111-.02h-.11c-.23.002-.456.04-.674.111a5.34 5.34 0 0 0-.703.26 6.503 6.503 0 0 0-.661.343c-.215.127-.405.249-.573.362a9.578 9.578 0 0 0-5.143 0 13.507 13.507 0 0 0-.572-.362 6.022 6.022 0 0 0-.672-.342 4.516 4.516 0 0 0-.705-.261 2.203 2.203 0 0 0-.662-.111h-.11a.29.29 0 0 0-.11.02 5.844 5.844 0 0 0-.23.763c-.054.254-.08.513-.081.773 0 .202.017.404.051.604.033.199.086.394.16.582A3.888 3.888 0 0 0 5.702 10a4.142 4.142 0 0 0-.263 1.476 6.871 6.871 0 0 0 .292 2.12c.181.563.483 1.08.884 1.516.415.422.915.75 1.466.964.653.25 1.337.41 2.033.476a1.828 1.828 0 0 0-.452.633 2.99 2.99 0 0 0-.2.744 2.754 2.754 0 0 1-1.175.27 1.788 1.788 0 0 1-1.065-.3 2.904 2.904 0 0 1-.752-.824 3.1 3.1 0 0 0-.292-.382 2.693 2.693 0 0 0-.372-.343 1.841 1.841 0 0 0-.432-.24 1.2 1.2 0 0 0-.481-.101c-.04.001-.08.005-.12.01a.649.649 0 0 0-.162.02.408.408 0 0 0-.13.06.116.116 0 0 0-.06.1.33.33 0 0 0 .14.242c.093.074.17.131.232.171l.03.021c.133.103.261.214.382.333.112.098.213.209.3.33.09.119.168.246.231.381.073.134.15.288.231.463.188.474.522.875.954 1.145.453.243.961.364 1.476.351.174 0 .349-.01.522-.03.172-.028.343-.057.515-.091v1.743a.5.5 0 0 1-.533.521h-.062a10.286 10.286 0 1 1 6.324 0v.005z"></path>
              </svg>
            </Link>
            <Link href="https://peq.nu/Z4SZl3m" title="Github - Backend">
              <svg
                stroke="#fff"
                fill="#fff"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="50px"
                width="50px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.976 0A7.977 7.977 0 0 0 0 7.976c0 3.522 2.3 6.507 5.431 7.584.392.049.538-.196.538-.392v-1.37c-2.201.49-2.69-1.076-2.69-1.076-.343-.93-.881-1.175-.881-1.175-.734-.489.048-.489.048-.489.783.049 1.224.832 1.224.832.734 1.223 1.859.88 2.3.685.048-.538.293-.88.489-1.076-1.762-.196-3.621-.881-3.621-3.964 0-.88.293-1.566.832-2.153-.05-.147-.343-.978.098-2.055 0 0 .685-.196 2.201.832.636-.196 1.322-.245 2.007-.245s1.37.098 2.006.245c1.517-1.027 2.202-.832 2.202-.832.44 1.077.146 1.908.097 2.104a3.16 3.16 0 0 1 .832 2.153c0 3.083-1.86 3.719-3.62 3.915.293.244.538.733.538 1.467v2.202c0 .196.146.44.538.392A7.984 7.984 0 0 0 16 7.976C15.951 3.572 12.38 0 7.976 0z"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
}
