"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const CustomLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  // Check if the link is active (matches the current route)
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      style={{ color: isActive ? "#FF8100" : " rgba(22, 18, 13, 0.75)" }}
      passHref
    >
      {children}
    </Link>
  );
};
