"use client"

import { cn } from "@/lib/utils"
import { useOrder } from "@/components/order-context"
import { EGG_SIZES, formatPrice } from "@/lib/egg-data"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export function SizeSelector() {
  const { order, setSize } = useOrder()

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-foreground">1. Tamanho do Ovo</h2>
        <p className="mt-1 font-[var(--font-inter)] text-sm text-muted-foreground">
          Escolha o tamanho ideal para a sua Pascoa
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {EGG_SIZES.map((size, index) => {
          const isSelected = order.sizeIndex === index
          return (
            <motion.button
              key={size.weight}
              onClick={() => setSize(index)}
              className={cn(
                "group relative flex flex-col items-center gap-2 rounded-2xl border-2 px-4 py-6 font-[var(--font-inter)] transition-colors duration-200",
                isSelected
                  ? "border-accent bg-accent/10 shadow-lg shadow-accent/10"
                  : "border-border bg-card hover:border-accent/40 hover:shadow-md"
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              layout
            >
              <span className="text-3xl font-bold text-foreground">{size.weight}</span>
              <span className={cn(
                "text-base font-bold",
                isSelected ? "text-accent" : "text-muted-foreground"
              )}>
                {formatPrice(size.price)}
              </span>
              <span className="text-xs text-muted-foreground">
                {size.maxFillings === 1 ? "1 recheio" : `ate ${size.maxFillings} recheios`}
                {" / "}
                {`${size.maxToppings} coberturas`}
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
    </section>
  )
}
