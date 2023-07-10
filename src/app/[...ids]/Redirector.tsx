import { BACKEND_URL } from "@/constants/env";
import { toast } from "react-hot-toast";
import RouterPush from "./RouterPush";

type Params = { ids: string[] };
const fetchUrl = async (params: Params) => {
  const hash = params.ids.slice(-1)[0];
  if (!hash) return toast.error("Deu ruim, tente novamente.");
  const originalUrl: string = await fetch(`${BACKEND_URL}${hash}`)
    .then((res) => res.json())
    .then((res: { url: string }) => res.url);
  return originalUrl;
};

export default async function Redirector({ params }: { params: Params }) {
  const url = await fetchUrl(params);

  return (
    <>
      <RouterPush url={url} />
    </>
  );
}
