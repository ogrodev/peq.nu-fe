import "@/styles/globals.css";
import { cn } from "@/utils/className";
import type { Metadata } from "next";
import { Expletus_Sans, Poppins } from "next/font/google";
import type { PropsWithChildren } from "react";

const expletus = Expletus_Sans({
  display: "swap",
  variable: "--expletus-sans",
  subsets: ["latin-ext"],
});

const poppins = Poppins({
  display: "swap",
  variable: "--poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Redirecting...",
  description: "Redirecting...",
  icons: [
    {
      url: "/favicon.ico",
      href: "/favicon.ico",
      sizes: "16x16",
      type: "image/x-icon",
    },
  ],
  keywords: "peqnu, url shortener, url, shortener, peq, nu, peq.nu, encurtador",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={cn(expletus.className, poppins.className)}>
        {children}
      </body>
    </html>
  );
}
