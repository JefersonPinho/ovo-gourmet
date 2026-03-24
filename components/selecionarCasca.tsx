"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useOrder } from "@/components/order-context";
import { SHELL_TYPES } from "@/lib/egg-data";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function SelecionarCasca() {
  const { order, setShell } = useOrder();

  return (
    <section className="space-y-8">
      <div className="flex flex-col items-start text-left">
        <h2 className="text-3xl font-bold text-foreground font-serif tracking-tight">
          2. Tipo de Casca
        </h2>
        <p className="mt-2 text-sm text-muted-foreground tracking-widest uppercase text-[11px] font-semibold">
          Selecione o chocolate da sua casca
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SHELL_TYPES.map((shell) => {
          const isSelected = order.shell === shell.id;

          return (
            <motion.button
              key={shell.id}
              onClick={() => setShell(shell.id)}
              className={cn(
                "group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border p-8 min-h-[160px] transition-all duration-500 ease-out outline-none isolate",
                isSelected
                  ? "border-accent shadow-[0_10px_40px_-15px_rgba(var(--accent),0.4)] ring-1 ring-accent"
                  : "border-border/40 hover:border-accent/40 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1",
              )}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <Image
                src={shell.image}
                alt={shell.label}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110 -z-20"
                quality={75}
              />

              <div className="absolute inset-0 bg-black/60 -z-10" />

              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-70 -z-10" />
              )}

              <div className="relative flex flex-col items-center z-10 w-full mt-2">
                <span
                  className={cn(
                    "font-serif text-2xl font-medium tracking-tight text-center transition-colors duration-500",

                    isSelected
                      ? "text-accent"
                      : "text-white group-hover:text-accent/90",
                  )}
                >
                  {shell.label}
                </span>

                <div
                  className={cn(
                    "my-3 h-[1px] transition-all duration-500 ease-in-out",
                    isSelected
                      ? "bg-accent/60 w-16"
                      : "bg-white/30 group-hover:bg-accent/50 group-hover:w-12 w-8",
                  )}
                />

                <span className="text-center font-sans text-xs leading-relaxed text-white/80 line-clamp-2">
                  {shell.description}
                </span>
              </div>

              {isSelected && (
                <motion.div
                  className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white backdrop-blur-sm z-20"
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
