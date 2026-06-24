"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { hero } from "@/data/content";

const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <a
          href="#"
          className={`flex items-center transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Logo size={112} showBadge={false} />
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-ants-ink-muted">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-ants-ink transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden md:inline-block rounded-full bg-ants-ink text-white text-sm font-semibold px-5 py-2 hover:bg-ants-ink/90 transition-colors"
        >
          {hero.ctaPrimary}
        </a>

        <button
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="md:hidden text-ants-ink"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className="md:hidden bg-white border-t border-ants-border px-6 py-4 flex flex-col gap-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-ants-ink font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="rounded-full bg-ants-ink text-white text-sm font-semibold px-5 py-2 text-center"
            onClick={() => setMenuOpen(false)}
          >
            {hero.ctaPrimary}
          </a>
        </nav>
      )}
    </header>
  );
}
