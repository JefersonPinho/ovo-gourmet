"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useOrder } from "@/components/order-context";
import { TOPPINGS } from "@/lib/egg-data";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { toast } from "sonner";

export function SelecionarCobertura() {
  const { order, toggleTopping } = useOrder();

  const handleToggle = (id: string) => {
    const isSelected = order.toppings.includes(id);

    if (!isSelected && order.toppings.length >= 2) {
      toast.warning("Você só pode escolher até 2 adicionais!", {
        description: "Desmarque um adicional se quiser trocar.",
      });
      return;
    }
    toggleTopping(id);
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col items-start text-left">
        <h2 className="text-3xl font-bold text-foreground font-serif tracking-tight">
          4. Adicionais
        </h2>
        <p className="mt-2 text-sm text-muted-foreground tracking-widest uppercase text-[11px] font-semibold flex items-center justify-center sm:justify-start gap-2">
          Escolha até 2 adicionais
          {order.toppings.length > 0 && (
            <span className="text-accent font-bold bg-accent/10 px-2 py-0.5 rounded-full">
              ({order.toppings.length} de 2)
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
              onClick={() => handleToggle(topping.id)}
              className={cn(
                "group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border p-6 min-h-[120px] transition-all duration-500 ease-out outline-none isolate",
                isSelected
                  ? "border-accent shadow-[0_10px_30px_-15px_rgba(var(--accent),0.4)] ring-1 ring-accent"
                  : "border-border/40 hover:border-accent/40 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1",
              )}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <Image
                src={topping.image}
                alt={topping.label}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110 -z-20"
                quality={70}
              />

              <div className="absolute inset-0 bg-black/60 -z-10" />

              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-70 -z-10" />
              )}

              <div className="relative flex flex-col items-center z-10 w-full px-2">
                <span
                  className={cn(
                    "font-serif text-[1.35rem] leading-tight font-medium tracking-tight text-center transition-colors duration-500",

                    isSelected
                      ? "text-accent"
                      : "text-white group-hover:text-accent/90",
                  )}
                >
                  {topping.label}
                </span>
              </div>

              {isSelected && (
                <motion.div
                  className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white backdrop-blur-sm z-20"
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
