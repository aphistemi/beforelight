// hooks/use-toast.tsx
import * as React from "react"

export type Toast = {
  id?: string
  title?: string
  description?: string
  action?: React.ReactNode
  // allow any extra props your UI may spread onto <Toast ...props />
  [key: string]: any
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
    const obj: Toast = typeof t === "string" ? { title: t } : t
    setToasts((prev) => [
      ...prev,
      { id: Date.now().toString(), ...obj },
    ])
    if (typeof window !== "undefined") {
      // dev aid; replace with your real toaster UI as needed
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
