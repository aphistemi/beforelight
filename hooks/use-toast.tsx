"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Toast = {
  id?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  // allow extra props that your <Toast {...props} /> might spread
  [key: string]: any;
};

type Ctx = {
  toasts: Toast[];
  toast: (t: Toast | string) => void;
};

const ToastContext = createContext<Ctx>({ toasts: [], toast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (t: Toast | string) => {
    const obj: Toast = typeof t === "string" ? { title: t } : t;
    setToasts((prev) => [...prev, { id: Date.now().toString(), ...obj }]);
    // dev aid; swap for a real UI if you want
    if (typeof window !== "undefined") console.log("[toast]", obj);
  };

  return (
    <ToastContext.Provider value={{ toasts, toast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
