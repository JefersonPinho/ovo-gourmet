"use client";

import { cn } from "@/lib/utils";
import { useOrder } from "@/components/order-context";
import { TOPPINGS, formatPrice } from "@/lib/egg-data";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function SelecionarCobertura() {
  const { order, toggleTopping } = useOrder();

  return (
    <section className="space-y-8">
      <div className="flex flex-col items-start text-left">
        <h2 className="text-3xl font-bold text-foreground font-serif tracking-tight">
          4. Coberturas
        </h2>
        <p className="mt-2 text-sm text-muted-foreground tracking-widest uppercase text-[11px] font-semibold flex items-center justify-center sm:justify-start gap-2">
          Finalize com seus toques favoritos
          {order.toppings.length > 0 && (
            <span className="text-accent font-bold bg-accent/10 px-2 py-0.5 rounded-full">
              ({order.toppings.length} selecionada
              {order.toppings.length > 1 ? "s" : ""})
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {TOPPINGS.map((topping) => {
          const isSelected = order.toppings.includes(topping.id);

          return (
            <motion.button
              key={topping.id}
              onClick={() => toggleTopping(topping.id)}
              className={cn(
                "group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border bg-card p-6 min-h-[130px] transition-all duration-500 ease-out outline-none",
                isSelected
                  ? "border-accent shadow-[0_10px_30px_-15px_rgba(var(--accent),0.4)] ring-1 ring-accent"
                  : "border-border/40 hover:border-accent/40 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1",
              )}
              whileTap={{ scale: 0.98 }}
              layout
            >
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-50" />
              )}

              <div className="relative flex flex-col items-center z-10 w-full px-2">
                <span
                  className={cn(
                    "font-serif text-[1.25rem] leading-tight font-medium tracking-tight text-center transition-colors duration-500",
                    isSelected
                      ? "text-accent"
                      : "text-foreground group-hover:text-accent/90",
                  )}
                >
                  {topping.label}
                </span>

                {/* Pill de Preço Elegante */}
                <div
                  className={cn(
                    "mt-3 rounded-full px-3 py-1 font-sans text-[11px] font-bold tracking-wide transition-all duration-500 uppercase",
                    isSelected
                      ? "bg-accent/20 text-accent shadow-sm"
                      : topping.price === 0
                        ? "bg-green-500/10 text-green-600 group-hover:bg-green-500/20"
                        : "bg-secondary/50 text-secondary-foreground group-hover:bg-accent/10 group-hover:text-accent",
                  )}
                >
                  {topping.price === 0
                    ? "Incluso"
                    : `+ ${formatPrice(topping.price)}`}
                </div>
              </div>

              {/* Ícone Flutuante de Seleção */}
              {isSelected && (
                <motion.div
                  className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent backdrop-blur-sm"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
