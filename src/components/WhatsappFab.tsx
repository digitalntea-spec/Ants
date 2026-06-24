import { contact } from "@/data/content";

export default function WhatsappFab() {
  const message = encodeURIComponent("Hola ANTS! Quiero info sobre sus sistemas de venta.");
  return (
    <a
      href={`https://wa.me/${contact.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-white"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="shrink-0">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.27-1.38a9.9 9.9 0 0 0 4.77 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.06a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.13.82.84-3.05-.2-.31a8.15 8.15 0 0 1-1.25-4.29c0-4.51 3.67-8.18 8.18-8.18 4.51 0 8.18 3.67 8.18 8.18 0 4.51-3.67 8.18-8.18 8.18Z" />
      </svg>
      <span className="font-semibold text-sm">Escribime</span>
    </a>
  );
}
