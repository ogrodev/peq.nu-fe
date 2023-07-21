import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  link: string;
  title: string;
  icon: ReactNode;
}

export default function RepoLink({ icon, title, link }: Props) {
  return (
    <Link href={link} title={title}>
      {icon}
    </Link>
  );
}
