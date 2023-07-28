/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { cn } from "@/utils/className";
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  ReactElement,
  Ref,
} from "react";
import { forwardRef } from "react";

export type TAs =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "p"
  | "span"
  | "link"
  | "label";

type Size = keyof typeof sizeClassMap;

type SpecialTextProps<T extends TAs> = {
  as: T;
  size?: Size;
  disabled?: boolean;
};

type Extend<T, U> = T & Omit<U, keyof T>;

export type TextProps<T extends TAs> = Extend<
  SpecialTextProps<T>,
  ComponentPropsWithoutRef<T>
>;

type TextComponentWithRef = {
  <T extends TAs>(props: TextProps<T> & { ref?: Ref<T> }): ReactElement;
  displayName: string;
};

const Text = forwardRef(
  <T extends TAs>(props: TextProps<T>, forwardedRef: ForwardedRef<T>) => {
    const { size = "base", className, children, disabled, ...rest } = props;

    const disabledClass = disabled
      ? "opacity-50 cursor-not-allowed hover:text-ds-dark-800"
      : "";

    const finalClassname = cn(
      "font-expletus",
      sizeClassMap[size],
      className,
      disabledClass,
    );

    const Component: ElementType = rest.as;

    function isLink(props: TextProps<TAs>): props is TextProps<"link"> {
      return props.as === "link";
    }

    const finalProps: ComponentProps<typeof Component> = {
      ...rest,
      as: undefined,
      className: finalClassname,
      children,
      href: isLink(props) ? props.href ?? "" : undefined,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <Component {...finalProps} ref={forwardedRef as any} />;
  },
) as TextComponentWithRef;

Text.displayName = "Text";

const sizeClassMap = {
  xs: "text-xs",
  sm: "text-sm",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
  base: "text-base",
};

export default Text;
