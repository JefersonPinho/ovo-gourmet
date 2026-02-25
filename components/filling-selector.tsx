"use client"

import { cn } from "@/lib/utils"
import { useOrder } from "@/components/order-context"
import { FILLINGS } from "@/lib/egg-data"
import { motion, AnimatePresence } from "framer-motion"
import { Check, AlertCircle } from "lucide-react"

export function FillingSelector() {
  const { order, toggleFilling, currentSize, fillingLimitReached } = useOrder()

  const maxFillings = currentSize?.maxFillings ?? 1

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-foreground">3. Recheio</h2>
        <p className="mt-1 font-[var(--font-inter)] text-sm text-muted-foreground">
          {maxFillings === 1
            ? "Escolha 1 recheio"
            : `Escolha ate ${maxFillings} recheios`}
          {" "}
          <span className="font-bold text-accent">
            ({order.fillings.length} de {maxFillings})
          </span>
        </p>
      </div>

      {maxFillings === 2 && order.fillings.length === 2 && (
        <div className="flex gap-3 rounded-xl bg-secondary px-4 py-3 font-[var(--font-inter)]">
          <div className="flex-1 text-center">
            <p className="text-xs font-medium text-muted-foreground">Metade 1</p>
            <p className="text-sm font-bold text-foreground">
              {FILLINGS.find((f) => f.id === order.fillings[0])?.label}
            </p>
          </div>
          <div className="w-px bg-border" />
          <div className="flex-1 text-center">
            <p className="text-xs font-medium text-muted-foreground">Metade 2</p>
            <p className="text-sm font-bold text-foreground">
              {FILLINGS.find((f) => f.id === order.fillings[1])?.label}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {FILLINGS.map((filling) => {
          const isSelected = order.fillings.includes(filling.id)
          const isDisabled = fillingLimitReached && !isSelected
          return (
            <motion.button
              key={filling.id}
              onClick={() => !isDisabled && toggleFilling(filling.id)}
              disabled={isDisabled}
              className={cn(
                "group relative flex flex-col items-center justify-center gap-1.5 rounded-2xl border-2 px-3 py-5 font-[var(--font-inter)] transition-colors duration-200",
                isSelected
                  ? "border-accent bg-accent/10 shadow-lg shadow-accent/10"
                  : isDisabled
                    ? "cursor-not-allowed border-border/50 bg-muted/50 opacity-50"
                    : "border-border bg-card hover:border-accent/40 hover:shadow-md"
              )}
              whileHover={isDisabled ? {} : { scale: 1.03 }}
              whileTap={isDisabled ? {} : { scale: 0.97 }}
            >
              <span className="text-center text-sm font-semibold text-foreground">{filling.label}</span>
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

      <AnimatePresence>
        {fillingLimitReached && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 rounded-xl bg-accent/10 px-4 py-3 font-[var(--font-inter)]"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0 text-accent" />
            <p className="text-xs font-medium text-muted-foreground">
              Limite de {maxFillings} {maxFillings === 1 ? "recheio atingido" : "recheios atingido"}. Desmarque um para escolher outro.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
