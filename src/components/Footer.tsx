import Logo from "./Logo";
import { contact } from "@/data/content";

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-ants-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ants-ink-muted">
        <div className="flex items-center gap-2">
          <Logo size={36} showBadge={false} />
          <span>ANTS — Camino de Hormigas</span>
        </div>
        <div className="flex gap-4">
          <a href={`mailto:${contact.email}`} className="hover:text-ants-ink">
            {contact.email}
          </a>
          <a href={`https://wa.me/${contact.whatsapp}`} className="hover:text-ants-ink">
            {contact.whatsappDisplay}
          </a>
        </div>
        <span>© {new Date().getFullYear()} ANTS. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}
