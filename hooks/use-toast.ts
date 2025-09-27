// hooks/use-toast.ts
import * as React from "react"

export type Toast = {
  id?: string
  title?: string
  description?: string
}

type Ctx = {
  toasts: Toast[]
  toast: (t: Toast | string) => void
}

const ToastContext = React.createContext<Ctx>({
  toasts: [],
  toast: () => {},
})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = (t: Toast | string) => {
    const obj: Toast =
      typeof t === "string" ? { title: t } : t
    setToasts((prev) => [...prev, { id: Date.now().toString(), ...obj }])
    // no-op: you can replace with a real UI later
    if (typeof window !== "undefined") {
      console.log("[toast]", obj)
    }
  }

  return (
    <ToastContext.Provider value={{ toasts, toast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  return React.useContext(ToastContext)
}
