"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useOrder } from "@/components/order-context";
import { EGG_SIZES, formatPrice } from "@/lib/egg-data";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function SelecionarTamanho() {
  const { order, setSize } = useOrder();

  return (
    <section className="space-y-8">
      <div className="flex flex-col items-start text-left">
        <h2 className="text-3xl font-bold text-foreground font-serif tracking-tight">
          1. Tamanho do Ovo
        </h2>
        <p className="mt-2 text-sm text-muted-foreground tracking-widest uppercase text-[11px] font-semibold">
          Escolha o tamanho ideal para a sua Páscoa
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {EGG_SIZES.map((size, index) => {
          const isSelected = order.sizeIndex === index;

          return (
            <motion.button
              key={size.weight}
              onClick={() => setSize(index)}
              className={cn(
                "group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border p-8 min-h-[180px] transition-all duration-500 ease-out outline-none isolate",
                isSelected
                  ? "border-accent shadow-[0_10px_40px_-15px_rgba(var(--accent),0.4)] ring-1 ring-accent"
                  : "border-border/40 hover:border-accent/40 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1",
              )}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <Image
                src={size.image}
                alt={`Ovo de ${size.weight}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110 -z-20"
                quality={75}
              />

              <div className="absolute inset-0 bg-black/75 -z-10" />

              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent opacity-80 -z-10" />
              )}

              <div className="relative flex flex-col items-center z-10">
                <span className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/90 drop-shadow-md transition-colors group-hover:text-white">
                  Peso Líquido
                </span>
                <span
                  className={cn(
                    "font-serif text-5xl font-bold tracking-tight drop-shadow-xl transition-colors duration-500",
                    isSelected
                      ? "text-accent"
                      : "text-white group-hover:text-accent/90",
                  )}
                >
                  {size.weight}
                </span>
              </div>

              <div
                className={cn(
                  "my-6 h-[1px] transition-all duration-500 ease-in-out z-10 drop-shadow-md",
                  isSelected
                    ? "bg-accent/80 w-24"
                    : "bg-white/50 group-hover:bg-accent/60 group-hover:w-20 w-12",
                )}
              />

              <div
                className={cn(
                  "relative z-10 rounded-full px-5 py-2 text-md font-bold tracking-wide transition-all duration-500 shadow-lg",
                  isSelected
                    ? "bg-accent text-white"
                    : "bg-black/70 text-white backdrop-blur-md border border-white/20 group-hover:bg-accent/90 group-hover:border-transparent",
                )}
              >
                {formatPrice(size.price)}
              </div>

              {isSelected && (
                <motion.div
                  className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white shadow-md z-20"
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
