'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { WhatsAppIcon } from './icons';
import { whatsappQuote } from '@/data/site';

/** Persistent WhatsApp chat bubble, bottom-right, on every breakpoint. */
export default function FloatingWhatsApp() {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={whatsappQuote}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Samarth Security on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card-hover transition-transform duration-200 hover:scale-110 focus-visible:outline-offset-4"
      initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Soft, slow attention-drawing pulse ring behind the button (not the frantic default ping) */}
      <span className="absolute inset-0 -z-10 animate-soft-pulse rounded-full bg-[#25D366]" />

      {/* Tooltip on hover (desktop) */}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100">
        Chat with us
      </span>

      <WhatsAppIcon className="h-7 w-7" />
      <span className="sr-only">Chat on WhatsApp</span>
    </motion.a>
  );
}
