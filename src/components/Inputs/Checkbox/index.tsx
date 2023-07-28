"use client";

import Text from "@/components/Typography/text";
import { cn } from "@/utils/className";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";

const CheckboxInput = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary [&_svg]:data-[state=checked]:fill-white",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <svg
        stroke="currentColor"
        strokeWidth="0"
        viewBox="0 0 16 16"
        height="16px"
        width="16px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path>
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
CheckboxInput.displayName = CheckboxPrimitive.Root.displayName;

interface Props
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  id: string;
  label?: string;
  labelClassName?: string;
}

export default function Checkbox({
  id,
  label,
  labelClassName,
  ...rest
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <CheckboxInput id={id} {...rest} />
      {label && (
        <Text as="label" htmlFor={id} className={cn(labelClassName)}>
          {label}
        </Text>
      )}
    </div>
  );
}
