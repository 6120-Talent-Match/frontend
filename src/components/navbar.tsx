"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Search",
    href: "/search",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full flex justify-between items-center p-4 bg-gray-900">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold text-white">
          Talent Match
        </Link>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-white ${pathname === item.href ? "font-bold" : ""
              }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
