"use client"

import { cn } from "@/lib/utils"
import { useOrder } from "@/components/order-context"
import { SHELL_TYPES } from "@/lib/egg-data"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

const SHELL_COLORS: Record<string, string> = {
  "ao-leite": "bg-[#6B3A2A]",
  "branco": "bg-[#F5F0E8]",
  "meio-a-meio": "bg-gradient-to-r from-[#6B3A2A] to-[#F5F0E8]",
  "70-cacau": "bg-[#3B1E0E]",
}

export function ShellSelector() {
  const { order, setShell } = useOrder()

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-foreground">2. Tipo de Casca</h2>
        <p className="mt-1 font-[var(--font-inter)] text-sm text-muted-foreground">
          Selecione o chocolate da casca
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {SHELL_TYPES.map((shell) => {
          const isSelected = order.shell === shell.id
          return (
            <motion.button
              key={shell.id}
              onClick={() => setShell(shell.id)}
              className={cn(
                "group relative flex flex-col items-center gap-3 rounded-2xl border-2 px-4 py-6 font-[var(--font-inter)] transition-colors duration-200",
                isSelected
                  ? "border-accent bg-accent/10 shadow-lg shadow-accent/10"
                  : "border-border bg-card hover:border-accent/40 hover:shadow-md"
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className={cn("h-10 w-10 rounded-full border border-border/50 shadow-inner", SHELL_COLORS[shell.id])} />
              <span className="text-sm font-semibold text-foreground">{shell.label}</span>
              <span className="text-center text-xs leading-relaxed text-muted-foreground">{shell.description}</span>
              {isSelected && (
                <motion.div
                  className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  <Check className="h-3.5 w-3.5 text-accent-foreground" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
