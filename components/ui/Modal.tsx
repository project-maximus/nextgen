"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** "modal" = centered dialog on all sizes; "sheet" = bottom sheet on mobile, centered modal on desktop */
  variant?: "modal" | "sheet";
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({ open, onClose, title, children, variant = "modal" }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Portals must only render after mount — checking `typeof document` during
  // render causes a hydration mismatch (see components/ui/Toast.tsx).
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <motion.div
            className="absolute inset-0 bg-neutral-900/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={
              reducedMotion
                ? { opacity: 0 }
                : variant === "sheet"
                  ? { opacity: 0, y: 40 }
                  : { opacity: 0, scale: 0.96 }
            }
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : variant === "sheet"
                  ? { opacity: 0, y: 40 }
                  : { opacity: 0, scale: 0.96 }
            }
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative z-10 w-full max-w-lg bg-white shadow-lg",
              variant === "sheet"
                ? "rounded-t-xl sm:rounded-xl max-h-[85vh] overflow-y-auto sm:max-h-[80vh]"
                : "rounded-xl max-h-[85vh] overflow-y-auto",
            )}
          >
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
              <h2 id="modal-title" className="text-h4 font-display text-neutral-900">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="rounded-full p-2 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="px-6 py-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
