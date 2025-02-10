"use client";
import Hamburger from "hamburger-react";
import Link from "next/link";
import { useState } from "react";
import pageConfig from "~/config/page.config";

const navItems = [
  { name: "Главная", href: pageConfig.HOME },
  { name: "Методические материалы", href: pageConfig.MATERIALS },
  { name: "Нормативные документы", href: pageConfig.DOCUMENTS },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 max-md:justify-end">
        <Link className="font-semibold" href="#">
          ИнфоИркутск
        </Link>
        <nav className="">
          <ul
            className={`flex gap-4 transition-all duration-300 max-md:fixed max-md:left-0 max-md:h-full max-md:w-full max-md:flex-col max-md:bg-background max-md:p-4 md:items-center md:justify-between ${isOpen ? "max-md:top-0" : "max-md:-top-full"}`}
          >
            {navItems.map((item) => (
              <li key={item.name} className="">
                <Link
                  href={item.href}
                  className="relative origin-left transform text-sm font-medium text-gray-700 before:absolute before:-bottom-1 before:left-0 before:h-0.5 before:w-full before:bg-foreground before:opacity-0 before:transition-all before:duration-150 before:ease-out before:content-[''] hover:text-gray-900 hover:before:bottom-0 hover:before:opacity-100 max-md:text-xl"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>{" "}
        <div className="md:hidden">
          <Hamburger onToggle={setIsOpen} toggled={isOpen} />
        </div>
      </div>
    </header>
  );
}
