import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  const classes: string = twMerge(clsx(inputs));
  return classes;
}
