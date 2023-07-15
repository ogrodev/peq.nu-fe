import Loader from "@/components/Loader";
import Text from "@/components/Typography/text";
import { cn } from "@/utils/className";

export default function Index() {
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
