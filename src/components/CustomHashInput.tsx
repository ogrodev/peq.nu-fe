import { isCustomAtom } from "@/atoms/home";
import { cn } from "@/utils/className";
import { useAtom } from "jotai";
import Text from "./Typography/text";

export default function CustomHashInput() {
  const [useCustom] = useAtom(isCustomAtom);
  return (
    <div className="relative h-24 w-[600px] max-w-[95vw] rounded-full lg:max-w-[600px]">
      <div
        className={cn(
          "mx-auto flex w-[450px] items-center justify-center rounded-full opacity-100 transition-opacity",
          "overflow-hidden",
          !useCustom && "pointer-events-none overflow-hidden opacity-0"
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
