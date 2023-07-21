import { cn } from "@/utils/className";
import { useState } from "react";
import Text from "./Typography/text";

export default function CustomHashInput() {
  const [useCustom, setUseCustom] = useState<boolean>(false);
  return (
    <div className="relative h-24 w-[600px] max-w-[95vw] rounded-full lg:max-w-[600px]">
      <button
        type="button"
        onClick={() => setUseCustom((prev) => !prev)}
        className={cn(
          "absolute left-1/2 top-0 w-[450px] -translate-x-1/2 rounded-b-3xl bg-primary p-3",
          "translate-y-0 font-poppins font-semibold text-white transition-transform",
          useCustom && "translate-y-[40px]"
        )}
      >
        <Text as="span" size="sm">
          {useCustom ? "Usar link aleatório" : "Usar link customizado"}
        </Text>
      </button>
      <div
        className={cn(
          "mx-auto flex w-[450px] items-center justify-center",
          !useCustom && "pointer-events-none overflow-hidden rounded-b-3xl"
        )}
      >
        <div
          className={cn(
            "h-10 w-fit cursor-default select-none pl-3 pr-1.5",
            "border border-gray-700/10 bg-[#223733] focus:outline-none",
            "flex items-center justify-center font-expletus placeholder:text-gray-100"
          )}
        >
          <Text as="p" className="text-gray-500">
            peq.nu/
          </Text>
        </div>
        <input
          id="hash"
          name="hash"
          placeholder="seu_link"
          className={cn(
            "h-10 w-[90px] px-3",
            "border border-gray-700/10 bg-[#223733] text-white focus:outline-none",
            "flex-grow font-expletus placeholder:text-gray-400"
          )}
        />
        <input
          id="useCustom"
          name="useCustom"
          type="checkbox"
          className="hidden"
          checked={useCustom}
          onChange={() => void 0}
        />
      </div>
    </div>
  );
}
