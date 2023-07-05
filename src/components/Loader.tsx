import { cn } from "@/utils/className";

export default function Loader() {
  return (
    <div
      className={cn(
        "relative left-[32px] h-4 w-4 rounded-[50%] bg-current text-white",
        "-ml-6 shadow-[32px_0,-32px_0,64px_0]",
        "after:absolute after:left-[-32px] after:top-0 after:w-[16px] after:content-['']",
        "after:h-[16px] after:animate-move after:rounded-[10px] after:bg-secondary"
      )}
    />
  );
}
