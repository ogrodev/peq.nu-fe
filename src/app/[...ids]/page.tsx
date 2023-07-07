"use client";
import Loader from "@/components/Loader";
import Text from "@/components/Typography/text";
import { cn } from "@/utils/className";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function Index({ params }: { params: { ids: string[] } }) {
  const router = useRouter();
  useEffect(() => {
    const fetchUrl = async () => {
      console.debug(params);
      if (!params.ids[0]) return toast.error("Deu ruim, tente novamente.");
      const originalUrl: string = await fetch(
        `https://peqnu-backend-aflavziouq-uc.a.run.app/${params.ids[0]}`
      )
        .then((res) => res.json())
        .then((res: { url: string }) => res.url);

      router.push(originalUrl);
    };
    fetchUrl().catch(() => toast.error("Deu ruim, tente novamente."));
  }, []);
  return (
    <>
      <main
        className={cn(
          "flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[rgb(5_61_56)] to-[rgb(20_20_15)]"
        )}
      >
        <Text as="h1" size="5xl" className="mb-10 text-primary">
          Calma que já vai!
        </Text>
        <Loader />
      </main>
    </>
  );
}
