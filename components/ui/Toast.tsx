"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X, XCircle } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type ToastVariant = "success" | "error";

interface ToastMessage {
  id: number;
  variant: ToastVariant;
  message: string;
}

interface ToastContextValue {
  showToast: (variant: ToastVariant, message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  // Portals must only render after mount — checking `typeof document` during
  // render causes a hydration mismatch, since the client's first render pass
  // already has `document` defined even before hydration completes.
  useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (variant: ToastVariant, message: string) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, variant, message }]);
      window.setTimeout(() => dismiss(id), 5000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {mounted &&
        createPortal(
          <div
            className="fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:items-end"
            aria-live="polite"
          >
            <AnimatePresence>
              {toasts.map((toast) => (
                <motion.div
                  key={toast.id}
                  role="status"
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: reducedMotion ? 0 : 0.25 }}
                  className={cn(
                    "flex w-full max-w-sm items-start gap-3 rounded-md border px-4 py-3 shadow-md",
                    toast.variant === "success"
                      ? "border-success/20 bg-success-bg text-success"
                      : "border-error/20 bg-error-bg text-error",
                  )}
                >
                  {toast.variant === "success" ? (
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  ) : (
                    <XCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  )}
                  <p className="flex-1 text-body-sm">{toast.message}</p>
                  <button
                    type="button"
                    onClick={() => dismiss(toast.id)}
                    aria-label="Dismiss notification"
                    className="text-current/70 hover:text-current"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}
