"use client";

import { useRouter } from "next/navigation";

export default function RouterPush({ url }: { url: string }) {
  const router = useRouter();
  router.push(url);
  return <></>;
}
