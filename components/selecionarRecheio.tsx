"use client";

import { cn } from "@/lib/utils";
import { useOrder } from "@/components/order-context";
import { FILLINGS } from "@/lib/egg-data";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { toast } from "sonner";

export function SelecionarRecheio() {
  const { order, toggleFilling } = useOrder();

  const handleToggle = (id: string) => {
    const isSelected = order.fillings.includes(id);

    if (!isSelected && order.fillings.length >= 2) {
      toast.warning("Você só pode escolher até 2 recheios por ovo!", {
        description: "Desmarque um sabor se quiser trocar.",
      });
      return;
    }
    toggleFilling(id);
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col items-start text-left">
        <h2 className="text-3xl font-bold text-foreground font-serif tracking-tight">
          3. Recheios
        </h2>
        <p className="mt-2 text-sm text-muted-foreground tracking-widest uppercase text-[11px] font-semibold flex items-center gap-2">
          Escolha até 2 sabores
          {order.fillings.length > 0 && (
            <span className="text-accent font-bold bg-accent/10 px-2 py-0.5 rounded-full">
              ({order.fillings.length} de 2)
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {FILLINGS.map((filling) => {
          const isSelected = order.fillings.includes(filling.id);

          return (
            <motion.button
              key={filling.id}
              onClick={() => handleToggle(filling.id)}
              className={cn(
                "group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border bg-card p-6 min-h-[120px] transition-all duration-500 ease-out outline-none",
                isSelected
                  ? "border-accent shadow-[0_10px_30px_-15px_rgba(var(--accent),0.4)] ring-1 ring-accent"
                  : "border-border/40 hover:border-accent/40 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1",
              )}
              whileTap={{ scale: 0.98 }}
            >
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-50" />
              )}
              <div className="relative flex flex-col items-center z-10 w-full px-2">
                <span
                  className={cn(
                    "font-serif text-[1.35rem] leading-tight font-medium tracking-tight text-center transition-colors duration-500",
                    isSelected
                      ? "text-accent"
                      : "text-foreground group-hover:text-accent/90",
                  )}
                >
                  {filling.label}
                </span>
              </div>
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
