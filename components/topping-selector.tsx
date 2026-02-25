"use client"

import { cn } from "@/lib/utils"
import { useOrder } from "@/components/order-context"
import { TOPPINGS, formatPrice } from "@/lib/egg-data"
import { motion, AnimatePresence } from "framer-motion"
import { Check, AlertCircle } from "lucide-react"

export function ToppingSelector() {
  const { order, toggleTopping, currentSize, toppingLimitReached } = useOrder()

  const maxToppings = currentSize?.maxToppings ?? 2

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-foreground">4. Coberturas</h2>
        <p className="mt-1 font-[var(--font-inter)] text-sm text-muted-foreground">
          Escolha ate {maxToppings} coberturas{" "}
          <span className="font-bold text-accent">
            ({order.toppings.length} de {maxToppings})
          </span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {TOPPINGS.map((topping) => {
          const isSelected = order.toppings.includes(topping.id)
          const isDisabled = toppingLimitReached && !isSelected
          return (
            <motion.button
              key={topping.id}
              onClick={() => !isDisabled && toggleTopping(topping.id)}
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
              <span className="text-center text-sm font-semibold text-foreground">{topping.label}</span>
              <span className={cn(
                "text-xs font-medium",
                topping.price === 0 ? "text-green-700" : "text-muted-foreground"
              )}>
                {topping.price === 0 ? "Incluso" : `+ ${formatPrice(topping.price)}`}
              </span>
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
        {toppingLimitReached && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 rounded-xl bg-accent/10 px-4 py-3 font-[var(--font-inter)]"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0 text-accent" />
            <p className="text-xs font-medium text-muted-foreground">
              Limite de {maxToppings} coberturas atingido. Desmarque uma para escolher outra.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
